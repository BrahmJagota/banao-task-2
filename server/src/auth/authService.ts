import bcrypt from 'bcrypt';
import { otpModel, userModel } from '../database/models';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import crypto from 'crypto';
interface ReturnInterface {
    userId?: string,
    error?: string
}
export const registerUser = async (username: string, email: string, password: string):Promise<ReturnInterface> => {
    try{
        const checkUser = await userModel.findOne({email});
        if(checkUser) return {error: "user already exists"};
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUser = await userModel.create({
            username, email, password: hashedPassword
        })
        return {userId: newUser.id};
    }catch(err) {
        console.error(err);
        return {error: "invalid details"}
    }
}

export const loginUser = async (email: string, password: string):Promise<ReturnInterface> => {
    try{
        const user = await userModel.findOne({email});
        if(!user) return {error: "user not found"};

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return { error: "Invalid credentials" };
        return {userId: user.id};
    }catch(err) {
        console.error(err);
        return {error: "something went wrong"};
    }
}

export const forgotPassword = async(email: string) => {
    try {
        const token = crypto.randomBytes(20).toString('hex');
        
        const user = await userModel.findOne({email})
        if(!user){
            return {error: "No user found"}
        } else {
            user.resetToken = token;
            user.save();
        }

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
            text: `opt for reseting your password is ${otp}
            Click the following link to reset your password: http://localhost:5173/reset-password/${token}`
        };
        
        transporter.sendMail(details, (err, data) => {
            if(err) {
                console.error("something went wrong", err);
                return {message: "something went wrong while generating otp"};
            }
            console.log(data);
        })
        const isCreated = await otpModel.findOneAndUpdate(
            { email }, 
            { otp, generatedBy: email,}, 
            { upsert: true, new: true }
        );

        return {message: otp}
    } catch (err) {
        console.error(err);
        return {message: "something went wrong"};
    }
}