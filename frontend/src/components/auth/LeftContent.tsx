import Lottie from "lottie-react"
import AuthLayout from "./AuthLayout"



const LeftContent = () => {
  return (
   <AuthLayout>
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
   </AuthLayout>
  )
}

export default LeftContent


