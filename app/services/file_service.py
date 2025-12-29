import os
from app.utils.file_utils import generate_unique_file_name
from app.services.document_service import extract_text
from app.utils.text_cleaner import clean_text
from app.utils.text_chunker import chunk_text
from app.services.embedding_service import EmbeddingService
from app.services.vector_store_singleton import vector_store
import numpy as np  
UPLOAD_DIR = "uploads"

embedding_service= EmbeddingService()

async def save_uploaded_file(file):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    filename = generate_unique_file_name(file.filename)
    file_path= os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    return file_path

async def process_document(file_path:str):
    raw_text = extract_text(file_path)
    cleaned_text = clean_text(raw_text)
    chunks= chunk_text(cleaned_text)
    return chunks

async def process_and_store_document(chunks: list[str]):
    embeddings = embedding_service.embed_texts(chunks)
    embeddings = np.array(embeddings)
    if embeddings.ndim == 1:
        embeddings = embeddings.reshape(1, -1)
    vector_store.add_vectors(embeddings,chunks)

async def semantic_search(query:str , top_k=5):
    query_embedding = embedding_service.embed_query(query)
    return vector_store.search(query_embedding, top_k)