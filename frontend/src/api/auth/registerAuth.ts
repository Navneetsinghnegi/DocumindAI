import { api } from "./http";


export const registerUser = async (email:string,password:string)=>{
    try{
            const response = await api.post(
                "/auth/register",
                {email,password},
                    
                
                
            )
            return response.data;
    }
    catch(error:any){
        const errorData = error.response?.data.detail;
        throw new Error(errorData.detail || "Registration failed");
    }
} 