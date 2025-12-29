from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.vector_store_manager import VectorStoreManager
from app.services.file_service import save_uploaded_file, process_document

# Initialize the router and the manager
router = APIRouter(prefix="/upload", tags=["Upload"])
manager = VectorStoreManager()

@router.post("/")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Save the file temporarily to disk
    file_path = await save_uploaded_file(file)
    
    # 2. Process the file to get text chunks
    # (Assuming process_document returns a list of strings)
    chunks = await process_document(file_path)
    
    # 3. Get the User ID as a string
    user_id = str(current_user.id)
    
    # 4. Load the user's personal Vector Store (creates it if it doesn't exist)
    store = manager.get_store(user_id)
    
    # 5. Add the new chunks to the store
    # (This calculates embeddings and adds them to the index)
    store.add_documents(chunks)
    
    # 6. CRITICAL STEP: Save the updated store back to disk
    manager.save_store(user_id, store)
    
    return {
        "message": "File uploaded and processed successfully",
        "user_id": user_id,
        "filename": file.filename,
        "chunks_added": len(chunks)
    }