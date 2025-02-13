import { getModelForClass, prop } from "@typegoose/typegoose";

class User {
    @prop({required: true, type: () => String})
    public username!: string;

    @prop({required: true, type: ()=> String})
    public email!: string;

    @prop({required: true, type: ()=> String})
    public password!: string;
}


export const userModel = getModelForClass(User);