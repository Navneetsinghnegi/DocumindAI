from sentence_transformers import SentenceTransformer

class EmbeddingService:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
    
    def embed_texts(self,texts:list[str]):
        return self.model.encode(texts, show_progress_bar=False)
    
    def embed_query(self,query:str):
        return self.model.encode([query])[0]