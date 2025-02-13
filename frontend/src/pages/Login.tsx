import {User, Lock} from 'lucide-react';
import {SubmitHandler, useForm} from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
  }

export default function () {
    const {
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log('Form submitted', data)
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({data}),
            credentials: "include",
        })
        .then((res) => res.json())
        .then(data => console.log('data', data))
        .catch((err) => console.error(err));
    }
    return (
        <div className="flex-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center p-8 border-2 rounded-lg w-1/4">
            <h1 className='text-2xl font-bold text-center my-8'>Login</h1>
            <small className='font-semibold'>Email</small>
            <div className='flex-start '><User size={15} color='#292929'/> <input type="email" className='placeholder-gray-500 border-none outline-none p-2' placeholder='Type your email' {...register("email")}/></div>
            <hr className='text-gray-500'/>


            <small className='font-semibold mt-4'>Password</small>
            <div className='flex-start '><Lock size={15} color='#292929'/> <input type="password" className='placeholder-gray-500 border-none outline-none p-2' placeholder='Type your password' {...register("password")}/></div>
            <hr className='text-gray-500'/>

            <button className='text-gray-500 border-none self-end text-sm cursor-pointer w-fit'>Forgot password?</button>

            <button className='rounded-xl p-2 border cursor-pointer mt-4 hover:bg-gray-200 hover:scale-105   transition-all'>Login</button>
            </form>
        </div>
    )
}