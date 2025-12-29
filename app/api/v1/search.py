from fastapi import APIRouter
from app.services.file_service import semantic_search

router = APIRouter(tags=["Search"])

@router.post("/search")
async def search_documents(query:str):
    results = await semantic_search(query,top_k=5)
    return{
        "query":query,
        "results": results
    }