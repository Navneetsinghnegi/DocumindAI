import faiss
import numpy as np
from app.services.embedding_service import EmbeddingService

class VectorStore:
    def __init__(self, dimension: int = 384):
        self.index = faiss.IndexFlatL2(dimension)
        self.text_chunks = []
        self.embedding_service = EmbeddingService()

    def add_documents(self, chunks: list[str]):
        """
        Embeds a list of text chunks and adds them to the FAISS index.
        """
        if not chunks:
            return

        # 1. Generate embeddings for all chunks
        # (We loop here, but efficient batching is better for production)
        embeddings = [self.embedding_service.embed_query(chunk) for chunk in chunks]
        
        # 2. Convert to numpy array for FAISS
        vectors = np.array(embeddings).astype('float32')

        # 3. Add to FAISS index
        self.index.add(vectors)

        # 4. Store the actual text
        self.text_chunks.extend(chunks)

    def search(self, query_embedding, top_k: int = 5):
        if not self.text_chunks:
            return []

        # Convert query to numpy
        query_vector = np.array([query_embedding]).astype('float32')
        
        # Search FAISS
        distances, indices = self.index.search(query_vector, top_k)
        
        # Retrieve text results
        results = []
        for i in indices[0]:
            if 0 <= i < len(self.text_chunks):
                results.append(self.text_chunks[i])
        
        return results