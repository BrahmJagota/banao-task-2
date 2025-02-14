import { putObject } from "../AWS/awsService"
import { postModel } from "../database/models";

export const uploadPost = async (caption: string, uploadedBy: string) => {
    const key = `/posts/${uploadedBy}-${Date.now()}`;
    const uploaded = await putObject(key);
    if(uploaded){
        const createPost = await postModel.create({postUrl: key, caption, uploadedBy})        
        console.log(uploaded)
        return uploaded;
    }
    return {error: "something went wrong"};
}
