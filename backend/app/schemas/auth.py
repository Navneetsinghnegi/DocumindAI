from pydantic import BaseModel, EmailStr, field_validator

class RegisterRequest(BaseModel):
    email:EmailStr
    password:str
    
    @field_validator("password", mode="before")
    @classmethod
    def validate_password_length(cls, v: str):
        if len(v.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 characters")
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v

class LoginRequest(BaseModel):
    email:EmailStr
    password:str

class TokenResponse(BaseModel):
    access_token:str
    token_type: str = "bearer"