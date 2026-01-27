export const registerUser = async (email:string,password:string)=>{
    const response = await fetch("http://localhost:8000/api/v1/auth/register",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            email,password,
        })

    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
    }

    return response.json();
} 