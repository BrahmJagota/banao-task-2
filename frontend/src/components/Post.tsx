    // const { useState } = React;
    import { useState } from "react";
    import { EllipsisVertical, Heart, MessageCircle, Share2 } from 'lucide-react';

    interface PostProps {
      username: string;
      imageUrl: string;
      caption: string;
      id: string;
    }

    export const Post: React.FC<PostProps> = ({ username, imageUrl, caption, id }) => {
      const [likes, setLikes] = useState(0);
      const [liked, setLiked] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);

      const toggleDropdown = () => {  
        setIsDropdownOpen(!isDropdownOpen);
      };

      const handleDelete = (key: string) => {
        console.log("key", key)
        fetch(`${import.meta.env.VITE_BASE_URL}/delete-post/${key}`, {
          method: 'GET',
          credentials: "include",
      })
      .then((res) => res.json())
      .then(data => console.log('data', data))
      .catch((err) => console.error(err));
      };
      const handleLike = () => {
        if (liked) {
          setLikes(likes - 1);
        } else {
          setLikes(likes + 1);
        }
        setLiked(!liked);
      };

      return (
        <div className="bg-white rounded-lg shadow-md max-w-sm w-full">
 <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center">
              <img
                src={`https://i.pravatar.cc/150?u=${username}`}
                alt={`${username}'s avatar`}
                className="w-10 h-10 rounded-full mr-3"
              />
<span className="font-semibold">{username}</span>
            </div>
            <div className="relative">
              <button onClick={toggleDropdown} className="cursor-pointer">
                <EllipsisVertical className="w-5 h-5 text-gray-500" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => handleDelete(id)}
                    className="block w-full text-left px-4 rounded-lg cursor-pointer py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            </div>
          <img src={imageUrl} alt="Post" className="max-w-full min-h-75 max-h-75 rounded-b-lg" />
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-2">
              <button onClick={handleLike}>
                <Heart className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-500'}`} />
              </button>
              <button>
                <MessageCircle className="w-6 h-6 text-gray-500" />
              </button>
              <button>
                <Share2 className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <p className="font-semibold">{likes} likes</p>
            <p>
              <span className="font-semibold mr-1">{username}</span>
              {caption}
            </p>
          </div>
        </div>
      );
    };
