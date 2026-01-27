from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models.user import User
from app.core.security import hash_password,verify_password, create_access_token

def register_user(db:Session, email:str, password:str):
    if len(password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long (maximum 72 characters)"
        )
    
    existing = db.query(User).filter(User.email ==email).first()
    if existing:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = "Email already registered"
        )
    
    user = User(
        email = email,
        hashed_password = hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email:str, password:str):
    user = db.query(User).filter(User.email ==email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Invalid email or password"
        )
    token = create_access_token({"sub": str(user.id)})
    return token