import bcrypt from 'bcrypt';
import { userModel } from '../database/models';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
interface ReturnInterface {
    userId?: string,
    message?: string
}
export const registerUser = async (username: string, email: string, password: string):Promise<ReturnInterface> => {
    try{
        const checkUser = await userModel.findOne({email});
        if(checkUser) return {message: "user already exists"};
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUser = await userModel.create({
            username, email, password: hashedPassword
        })
        return {userId: newUser.id};
    }catch(err) {
        console.error(err);
        return {message: "invalid details"}
    }
}

export const loginUser = async (email: string, password: string):Promise<ReturnInterface> => {
    try{
        const user = await userModel.findOne({email});
        if(!user) return {message: "user not found"};

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return { message: "Invalid credentials" };
        return {userId: user.id};
    }catch(err) {
        console.error(err);
        return {message: "something went wrong"};
    }
}

export const forgotPassword = async(email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'demouser2832@gmail.com',
                pass: 'pwpbzbfhgiupodhi'
            }
        });
        
        const otp =  otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const details = {
            from: 'demouser2832@gmail.com',
            to: email,
            subject: 'forgot password',
            text: `opt for reseting your password is ${otp}`
        };

        transporter.sendMail(details, (err, data) => {
            if(err) {
                console.error("something went wrong", err);
                return {message: "something went wrong while generating otp"};
            }
            console.log(data);
        })
        return {message: "otp send successfull"}
    } catch (err) {
        console.error(err);
        return {message: "something went wrong"};
    }
}