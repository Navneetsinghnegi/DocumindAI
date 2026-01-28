import { api } from "./http";


interface AuthResponse{
    access_token:string,
    token_type:string,
}

interface AuthError{
    detail:string,
}


export async function loginUser(email:string , password:string): Promise<AuthResponse>{
    const formData = new URLSearchParams();
    
    formData.append("username",email);
    formData.append("password",password);

    try{
            const response = await api.post(
                "/auth/login",
                formData,{
                    headers: {
                        "Content-Type": "applications/x.www-form.urlencoded",
                    },
                }
            );
            return response.data;
    }
    catch(error:any){
        
        const errorData = (await error.response.data) as AuthError; 

        const errorMessage = typeof errorData?.detail==="string"
        ? errorData.detail : "Login Failed";

        throw new Error(errorMessage);
    }
    
}