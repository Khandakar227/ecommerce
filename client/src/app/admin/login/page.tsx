'use client'
import { request } from "@/lib";
import { API_ENDPOINT } from "@/lib/config";
import { useUser } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react"

function Login() {
    const { signIn } = useUser();

    useEffect(() => {
        localStorage.removeItem('user');
    },[])

    const handleLogin = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            signIn(data.email as string, data.password as string, 'admin');
        } catch (error:any) {
            console.log(error.response.data.message);
        }
    }
    
  return (
    <div className="h-full grid justify-center items-center pt-10">
        <form className="block max-w-[30rem] mx-auto p-4 shadow rounded-lg bg-white" onSubmit={handleLogin}>
            <div>
                <h1 className="font-medium text-center py-4 text-2xl"> Login as Admin </h1>
            </div>
            <input className="w-full shadow rounded-lg p-3 my-2 focus-visible:outline-none focus-visible:border" type="email" name="email" placeholder="Email" required />
            <input className="w-full shadow rounded-lg p-3 my-2 focus-visible:outline-none focus-visible:border" type="password" name="password" placeholder="Password" required />
            <button className="w-full shadow rounded-lg p-3 my-2 bg-green-400" type="submit"> Login </button>
            <button className="text-green-700 hover:underline"> Forgot password? </button>
        </form>
    </div>
  )
}

export default Login