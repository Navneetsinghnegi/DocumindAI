from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.services.auth_service import register_user, authenticate_user
from app.core.database import get_db
from fastapi.security import OAuth2PasswordRequestForm
router= APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    user = register_user(db, request.email, request.password)
    return {"id": str(user.id), "email": user.email}


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    token = authenticate_user(
        db,
        email=form_data.username,  # username = email
        password=form_data.password
    )
    return {"access_token": token, "token_type": "bearer"}