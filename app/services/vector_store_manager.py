import os
import faiss
import pickle
# FIX: Import from the class file, not the singleton file
from app.services.vector_store import VectorStore 

BASE_DIR = "vector_stores"

class VectorStoreManager:
    def __init__(self, dimension: int = 384):
        self.dimension = dimension
        os.makedirs(BASE_DIR, exist_ok=True)

    def _get_user_dir(self, user_id: str):
        path = os.path.join(BASE_DIR, user_id)
        os.makedirs(path, exist_ok=True)
        return path

    def get_store(self, user_id: str) -> VectorStore:
        user_dir = self._get_user_dir(user_id)
        index_path = os.path.join(user_dir, "index.faiss")
        chunks_path = os.path.join(user_dir, "chunks.pkl")

        store = VectorStore(self.dimension)

        if os.path.exists(index_path) and os.path.exists(chunks_path):
            store.index = faiss.read_index(index_path)
            with open(chunks_path, "rb") as f:
                store.text_chunks = pickle.load(f)

        return store

    def save_store(self, user_id: str, store: VectorStore):
        user_dir = self._get_user_dir(user_id)
        faiss.write_index(store.index, os.path.join(user_dir, "index.faiss"))
        with open(os.path.join(user_dir, "chunks.pkl"), "wb") as f:
            pickle.dump(store.text_chunks, f)