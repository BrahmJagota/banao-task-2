import { useForm, SubmitHandler } from "react-hook-form"
import {User, Lock} from 'lucide-react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface FormData {
    email: string;
    password: string;
    confirmPassword: string
  }

export default function ResetPassword () {
    const {token} = useParams(); 
    const navigate = useNavigate();
     const {
            register, 
            handleSubmit,
            formState: {},
        } = useForm<FormData>();
        const onSubmit: SubmitHandler<FormData> = async (data) => {
            console.log('Form submitted', data)
            fetch(`${import.meta.env.VITE_BASE_URL}/new-password/${token}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({data}),
                credentials: "include",
            })
            .then((res) => res.json())
            .then(data =>{
                if(data.isChanged === true) {
                    navigate('/login');
                }
            })
            .catch((err) => console.error(err));
        }
    

    return (
        <div className="flex-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center p-8 border-2 rounded-lg w-1/4">
            <h1 className='text-2xl font-bold text-center my-8'>Reset Password</h1>


            <small className='font-semibold mt-4'>Password</small>
            <div className='flex-start '><Lock size={15} color='#292929'/> <input type="password" className='placeholder-gray-500 border-none outline-none p-2' placeholder='Type your password' {...register("password")}/></div>
            <hr className='text-gray-500'/>

            <small className='font-semibold mt-4'>Confirm Password</small>
            <div className='flex-start '><Lock size={15} color='#292929'/> <input type="password" className='placeholder-gray-500 border-none outline-none p-2' placeholder='Type your password' {...register("confirmPassword")}/></div>
            <hr className='text-gray-500'/>

            <button className='text-gray-500 border-none self-end text-sm cursor-pointer w-fit'>Forgot password?</button>

            <button className='rounded-xl p-2 border cursor-pointer mt-4 hover:bg-gray-200 hover:scale-105   transition-all'>Login</button>
            </form>
        </div>
    )
}