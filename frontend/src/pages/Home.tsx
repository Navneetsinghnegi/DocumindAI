import { useState } from "react"
import AuthLayout from "../components/auth/AuthLayout";
import RightContent from "../components/auth/RightContent";

type Authmode = "signup" | "login";

const Home = () => {
    const [mode, setMode] = useState<Authmode>("signup");

    const isSignup = mode ==="signup";

    return (
        <AuthLayout>

        
        <RightContent>
            <div className="flex flex-col justify-between items-center h-full">
                <div className="text-white">
                    <h1 className="text-4xl font-extrabold ">
                        {isSignup ? "Create your account" : "Welcome back"}
                    </h1>
                    <p className="text-xl">
                        {isSignup ? "Start using Documind AI" : "Sign in to continue to Documind AI"}
                    </p>
                </div>

                <div className="flex flex-col justify-between gap-3 content-center w-100 p-2
                ">
                        <form className="flex flex-col gap-2 pb-0 " >
                            {/* email */}
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold " >
                                    Email
                                    
                                </label>
                                <input type="email" placeholder="you@example.com" className="bg-gray-300  h-7 px-2 py-4 content-start w-full" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-semibold">Password</label>
                                <input type="password" placeholder="••••••••" className="bg-gray-300 h-7 px-2 w-full" />
                            </div>

                            {isSignup && (
                                <>
                                    <label className="font-semibold">Confirm Password</label>
                                    <input type="password" placeholder="••••••••" className="bg-gray-300 h-7 px-2 w-full"/>
                                </>
                            )}

                            <div className=" text-white flex flex-col content-center items-center">
                                <button className="w-40 h-10 rounded-full bg-blue-600 mt-5 font-bold">
                                    {isSignup? "Create Account" : "Sign in"}
                                </button>
                            </div>
                    
                        </form>

                            
                       
                       
                </div>
                <div className="font-mono flex flex-col content-center">
                                <p>
                                    {isSignup ? (
                                        <>
                                            Already have an account?{" "}
                                            <button type="button" onClick={()=>setMode("login")} >
                                                Login
                                            </button>
                                        </>
                                    ):(
                                        <>
                                            New here?{" "}
                                            <button type="button" onClick={()=>setMode("signup")}>
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