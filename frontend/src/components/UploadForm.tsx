// import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// interface FormData {
//   caption: string;
// }

// const ImageUploadForm: React.FC = () => {
//   const [post, setPost] = useState<File | null>(null);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: {},
//   } = useForm<FormData>();

//   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setPost(file);
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     console.log("Form submitted", data);
//     fetch("http://localhost:3000/post-image", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data }),
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("data", data);

//         fetch(data.url, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "image/jpeg",
//           },
//           body:  post ,
//         });
//       })
//       .catch((err) => console.error(err))
//       .finally(()=> {
//           setPost(null);
//             reset();
//       })
//   };

//   useEffect(()=> {
//     console.log("POST", post)
//   },[post])
//   return (
//     <div className="flex-center h-screen">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-lg shadow-md max-w-md w-full space-y-4"
//       >
//         <h2 className="text-xl font-semibold text-gray-800">Upload a Post</h2>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={onFileChange}
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Caption
//           </label>
//           <textarea
//             placeholder="Add a caption..."
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             {...register("caption")}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ImageUploadForm;







    // const { useState, useEffect } = React;
    import { CircleX, Cross, CrossIcon } from "lucide-react";
import { useState, useEffect } from "react";
    // const { useForm, SubmitHandler } = ReactHookForm;
    import {useForm, SubmitHandler} from 'react-hook-form';

    interface FormData {
      caption: string;
    }

    interface ImageModalProps {
      isOpen: boolean,
      setIsOpen: (isOpen: boolean) => void;
      handleModal: () => void;
    }
     const ImageUploadModal = ({isOpen, setIsOpen, handleModal}: ImageModalProps) => {
      const [post, setPost] = useState<File | null>(null);
      // const [isOpen, setIsOpen] = useState(true);

      const {
        register,
        handleSubmit,
        reset,
        formState: {},
      } = useForm<FormData>();

      const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setPost(file);
      };

      const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log("Form submitted", data);
        fetch("http://localhost:3000/post-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            fetch(data.url, {
              method: "PUT",
              headers: {
                "Content-Type": "image/jpeg",
              },
              body: post,
            });
          })
          .catch((err) => console.error(err))
          .finally(() => {
            setPost(null);
            reset();
            setIsOpen(false); 
          });
      };

      useEffect(() => {
        console.log("POST", post);
      }, [post]);

      if (!isOpen) return null; 

      return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md max-w-md w-full space-y-4"
          >
            <div className="flex justify-between align-center">
            <h2 className="text-xl font-semibold text-gray-800">Upload a Post</h2>
            <div className="cursor-pointer" onClick={handleModal}>
            <CircleX />
            </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={onFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Caption</label>
              <textarea
                placeholder="Add a caption..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("caption")}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Upload
            </button>
          </form>
        </div>
      );
    };
export default ImageUploadModal