def build_qa_prompt(context: list, question: str, chat_history: list = None) -> str:
    if chat_history is None:
        chat_history = []

    # 1. Format Context
    context_strs = []
    for chunk in context:
        if isinstance(chunk, str):
            context_strs.append(chunk)
        else:
            context_strs.append(getattr(chunk, 'page_content', str(chunk)))
    
    joined_context = "\n\n".join(context_strs)

    # 2. Format Chat History
    history_str = ""
    for msg in chat_history:
        role = "User" if msg["role"] == "user" else "Assistant"
        history_str += f"{role}: {msg['content']}\n"

    # 3. Build Final Prompt with STRICT Style Guidelines
    return f"""
You are a helpful and direct assistant. 
Answer the question based ONLY on the context provided below.

Guidelines:
1. Be direct. Do not start with "In this context" or "According to the document".
2. Do not explain why the answer is found. Just state the fact.
3. If the answer is not present in the context, strictly say "I don't know".

Chat History:
{history_str}

Context:
{joined_context}

Question:
{question}
"""