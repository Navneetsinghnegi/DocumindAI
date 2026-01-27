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

    const response = await fetch("http://localhost:8000/api/v1/auth/login",{
        method: "POST",
        headers: {
            "content-type" : "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
    });

    if(!response.ok){
        const errorData = (await response.json()) as AuthError; 

        const errorMessage = typeof errorData.detail==="string"
        ? errorData.detail : "Login Failed";

        throw new Error(errorMessage);
    }

    

    return (await response.json()) as AuthResponse;
}