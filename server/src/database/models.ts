import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

class User {
    @prop({required: true, type: () => String})
    public username!: string;

    @prop({required: true, type: ()=> String})
    public email!: string;

    @prop({required: true, type: ()=> String})
    public password!: string;

    @prop({required: false, type: ()=> String})
    public resetToken!: string;

    @prop({required: false, type: () => [Post], ref: ()=> Post})
    public posts?: Ref<Post>[];
}

class Post {
    @prop({required: true, type: () => String})
    public postUrl!: string;

    @prop({required: false, type: () => Number})
    public likes!: number;

    @prop({required: true, type: () => String})
    public caption!: string;

    @prop({required: false, type: () => [String]})
    public comments!: string[];

    @prop({required: true, type: ()=> User, ref: ()=> User})
    public uploadedBy!: Ref<User>
}

class Otp {
    @prop({required: true, type: () => Number})
    public otp!: number;

    @prop({required: true, type: () => String})
    public email!: string;
}
export const userModel = getModelForClass(User);
export const postModel = getModelForClass(Post);
export const otpModel = getModelForClass(Otp);