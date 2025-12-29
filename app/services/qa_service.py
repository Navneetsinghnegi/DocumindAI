from app.services.embedding_service import EmbeddingService
from app.services.vector_store_manager import VectorStoreManager
from app.services.llm_service import LLMService
from app.prompts.qa_prompt import build_qa_prompt
from app.services.chat_history import (
    get_chat_history,
    add_user_message,
    add_assistant_message
)

embedding_service = EmbeddingService()
llm_service = LLMService()
vector_manager = VectorStoreManager()


def answer_question(user_id: str, question: str, top_k: int = 5):
    # 1️⃣ Embed the query
    query_embedding = embedding_service.embed_query(question)

    # 2️⃣ Load USER-SCOPED vector store
    store = vector_manager.get_store(user_id)

    if not store.text_chunks:
        return {
            "question": question,
            "answer": "Please upload a document first.",
            "sources": []
        }

    # 3️⃣ Search relevant chunks
    relevant_chunks = store.search(query_embedding, top_k)

    # 4️⃣ Remove duplicate sources
    unique_sources = []
    seen = set()
    for chunk in relevant_chunks:
        # Extract text content carefully
        text = chunk if isinstance(chunk, str) else getattr(chunk, 'text', str(chunk))
        if text not in seen:
            unique_sources.append(text)
            seen.add(text)
    # 5️⃣ Fetch chat history (current session)
    chat_history = get_chat_history(user_id)

    # 6️⃣ Build prompt with context + chat history
    prompt = build_qa_prompt(
        context=unique_sources,
        question=question,
        chat_history=chat_history
    )

    # 7️⃣ Generate answer
    answer = llm_service.generate_answer(prompt)
    answer = clean_answer(answer)

    # 8️⃣ Update chat memory
    add_user_message(user_id, question)
    add_assistant_message(user_id, answer)

    return {
        "question": question,
        "answer": answer,
        "sources": unique_sources
    }


def clean_answer(answer: str) -> str:
    # 1. Remove common LLM prefixes
    for prefix in ["Answer:", "ANSWER:", "Assistant:"]:
        if answer.strip().startswith(prefix):
            answer = answer.strip()[len(prefix):].strip()

    # 2. CRITICAL: Stop reading if the model starts hallucinating the next section
    # This prevents the "Context:" dump you see in the screenshot
    if "Context:" in answer:
        answer = answer.split("Context:")[0]
        
    if "Question:" in answer:
        answer = answer.split("Question:")[0]

    return answer.strip()