from datetime import datetime, timezone, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.config import JWT_SECRET_KEY
from app.core.database import get_db
from app.models.user import User

ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES= 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def hash_password(password:str)-> str:
    return pwd_context.hash(password)

def verify_password(plain:str, hashed:str)-> bool:
    return pwd_context.verify(plain,hashed)

def create_access_token(data:dict, expires_delta:timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+(
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
        token:str = Depends(oauth2_scheme),
        db: Session= Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Invalid authentication credentials",
        headers = {"www-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        user_id:str | None = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    
    return user