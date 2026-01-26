import type { ReactNode } from "react";
import Lottie from "lottie-react"
import homePageAnimation from "../../assets/homePageAnimation.json"


interface AuthLayoutProps  {
    children : ReactNode;
}


const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div className='min-h-screen w-full flex justify-between p-7 '>
        {/* left div */}
        <div className="w-1/2 p-15 flex flex-col justify-between bg-blue-500 rounded-l-xl
        ">
            <div className="content-start flex flex-col text-white justify-between">
                <h1 className="font-bold text-5xl"> Documind AI</h1>
                <p className="font-normal font-Caveat text-2xl" id="subHeading">Make your document talk...</p>
            </div>

            <div>
                <Lottie
                    animationData={homePageAnimation}
                    loop
                    
                />

            </div>

            
        </div >
        
        {/* right div */}
        <div className="bg-blue-300 lg:w-1/2 p-15 flex flex-col justify-between content-center rounded-r-xl">
            {children}
        </div>
    </div>
  )
}

export default AuthLayout