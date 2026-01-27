from fastapi import APIRouter, Depends
from app.schemas.qa import AskRequest, AskResponse
from app.core.security import get_current_user
from app.models.user import User
from app.services.qa_service import answer_question
from app.services.chat_history import clear_chat_history    

router = APIRouter(prefix="/ask", tags=["Q&A"])

@router.post("/", response_model=AskResponse)
def ask_question_endpoint(
    request: AskRequest,
    current_user: User = Depends(get_current_user)
):
    # Pass user_id so we load the correct vector store from disk
    return answer_question(
        question=request.question,
        user_id=str(current_user.id)
    )

@router.delete("/history")
def clear_history_endpoint(
    current_user: User = Depends(get_current_user)
):
    """Clears the chat history for the current user."""
    clear_chat_history(str(current_user.id))
    return {"message": "History cleared"}