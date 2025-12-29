from fastapi import FastAPI
from app.api.v1.health import router as health_router
from app.api.v1.upload import router as upload_router
from app.api.v1.search import router as search_router
from app.api.v1.ask import router as ask_router
from app.api.v1 import auth

app = FastAPI(
    title= "AI Document Processing Backend",
    version = "1.0.0"
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(upload_router, prefix="/api/v1")
app.include_router(search_router, prefix="/api/v1")
app.include_router(ask_router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")