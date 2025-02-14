import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { PlusCircle } from "lucide-react";
import ImageUploadModal from "../components/UploadForm";

interface PostsInterface {
    caption: string,
    postUrl: string,
    uploadedBy: string;
    comments: string[];
    _id: string;
}
export default function Posts () {
    const [posts, setPosts] = useState<PostsInterface[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    


const handleModal = () => {
    setIsOpen(!isOpen)
}

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/get-posts`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setPosts(data.posts)
        })
          .catch((err) => console.error('Error:', err));
      }, []);
      
      
    return (
        <div className="grid p-4 grid-cols-4 gap-4">
            <ImageUploadModal isOpen={isOpen} setIsOpen={setIsOpen} handleModal={handleModal}/>
            {posts.map((post) => (
                <Post username='username' imageUrl={post.postUrl} caption={post.caption} id={post._id}/>
            ))}
            <div className="h-full flex-center  border-2 rounded-lg border-gray-500">
                <div className="cursor-pointer">
                <PlusCircle color="#292929" size={100} onClick={handleModal}/>
                </div>
            </div>
        </div>
    )
}