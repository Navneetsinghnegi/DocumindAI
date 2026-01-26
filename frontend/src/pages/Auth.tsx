import { useState } from "react"
import AuthLayout from "../components/auth/AuthLayout";
import RightContent from "../components/auth/RightContent";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";


type Authmode = "signup" | "login";




const Home = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<Authmode>("signup");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        setTimeout(()=>{
            setIsLoading(false)
            navigate("/dashboard")
        },2000);
    }
    
    const isSignup = mode ==="signup";

    return (
        <AuthLayout>

        
        <RightContent>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="text-white">
                    <h1 className="text-4xl font-extrabold ">
                        {isSignup ? "Create your account" : "Welcome back!!"}
                    </h1>
                    <p className="text-xl">
                        {isSignup ? "Start using Documind AI" : "Sign in to continue to Documind AI"}
                    </p>
                </div>

                <div className="flex flex-col justify-between gap-3 content-center w-100 p-2
                ">
                    {
                        error && (
                            <div className="mb-4 rounded-lg px-4 py-2 font-bold text-red-700 ml-15">
                                {error}
                            </div>
                        )
                    }
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 pb-0 " >
                            {/* email */}
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold " >
                                    Email
                                    
                                </label>
                                <input disabled={isLoading} type="email" placeholder="you@example.com" className={`bg-gray-300  h-7 px-2 py-4 content-start w-full ${error ? "bg-gray-300  h-7 px-2 py-4 content-start w-full border-3 border-red-700" : ""}` }/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Password</label>
                                <input disabled={isLoading} type="password" placeholder="••••••••" className={`bg-gray-300 h-7 px-2 w-full ${ error ? isSignup ?"" : "bg-gray-300 h-7 px-2 w-full border-3 border-red-700" : "" }`} />
                            </div>

                            {isSignup && (
                                <>
                                    <label className="font-semibold">Confirm Password</label>
                                    <input disabled={isLoading} type="password" placeholder="••••••••" className="bg-gray-300 h-7 px-2 w-full"/>
                                </>
                            )}

                            <div className=" text-white flex flex-col content-center items-center">
                                <button type="submit" disabled={isLoading} className={`w-40 h-10 rounded-full  mt-5 font-bold hover:cursor-pointer ${isLoading ? "bg-blue-400 cursor-not-allowed transition " : "bg-blue-600 "}` } >
                                    {isLoading ? isSignup ? "Creating account..." : "Signing in..."
                                    : isSignup? "Create Account" : "Sign in"}
                                </button>
                            </div>
                    
                        </form>
                </div>
                <div className="font-mono flex flex-col content-center">
                                <p>
                                    {isSignup ? (
                                        <>
                                            Already have an account?{" "}
                                            <button type="button" onClick={()=>[setMode("login"), setError(null)]} >
                                                Login
                                            </button>
                                        </>
                                    ):(
                                        <>
                                            New here?{" "}
                                            <button type="button" onClick={()=>[setMode("signup"), setError(null)]}>
                                                Create an Account
                                            </button>
                                        </>
                                    )
                                    
                                    }
                                </p>
                    </div>
                 

            
                
            </div>
            
        </RightContent>
        </AuthLayout>
        
    );
}

export default Home