import express from 'express'
import { uploadPost } from './postService';
import { postModel } from '../database/models';
import { deleteObject, getObject, listObjects } from '../AWS/awsService';
const postRouter = express.Router()

postRouter.post('/post-image', async (req, res)=> {
    try {
        const {caption } = req.body.data;
        if(req.session.userId){
        const uploadedBy = req.session.userId;
        
        const result = await uploadPost(caption, uploadedBy);
        res.status(200).json({url: result})
        return;
        }
        res.status(400).json({error: "something went wrong"});
        return;
    } catch(err){
        console.error(err);
        res.status(400).json({error: "something went wrong"});
    }})

postRouter.get('/like-post/:postId',async (req, res)=> {
    try{
        const postId = req.params.postId;
        const isLiked = postModel.findByIdAndUpdate(postId,
            { $inc: { likes: 1 } }, 
            { new: true }
        );
        res.status(200).json(isLiked);
    } catch(err) {
        console.error(err);
        res.status(400).json({error: "something went wrong"})
    }
})

postRouter.get('/get-posts', async(req, res) => {
    try {
        const url = await listObjects();
        if(!url || !url.Contents) {
            res.status(200).json({url: []})
            return;
        } else {
        const urls = await Promise.all(
            url.Contents.map(async (item) => {
              if (item.Key) {
                const url = await getObject(item.Key);
                return { key: item.Key, url };
              }
            })
          );
        const posts = await postModel.find({});

        const updatedPosts = posts.map((post) => {
            const postObject = post.toObject(); 

            const matchingUrl = urls.find((u) => u && u.key === postObject.postUrl);

            return {
                ...postObject, 
                postUrl: matchingUrl?.url || postObject.postUrl, 
            };
        });

        res.status(200).json({ posts: updatedPosts });
        }
    }
    catch(err) {
        console.error(err);
        res.status(400).json({error: "something went wrong"})
    }
})

postRouter.get('/delete-post/:key', async (req, res) => {
    try{
        const id = req.params.key;
        const post = await postModel.findById(id);
        if(post) {
             await deleteObject(post.postUrl)
            await postModel.deleteOne({_id: id})
            res.status(200).json({isDeleted: true});

        } 
        console.log(post)
        return
    }  catch(err) {
        console.error(err);
        res.status(400).json({error: "something went wrong"})
    }
})


export default postRouter;