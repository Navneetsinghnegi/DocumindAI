from huggingface_hub import InferenceClient
from app.core.config import HUGGINGFACE_API_KEY

class LLMService:
    def __init__(self) -> None:
        self.client = InferenceClient(
            
            token=HUGGINGFACE_API_KEY)
        
    def generate_answer(self,prompt:str) -> str:
        messages=[
            {"role":"user", "content":prompt}
        ]
        
        response = self.client.chat_completion(
            messages=messages,
            model="HuggingFaceH4/zephyr-7b-beta",
            max_tokens=512,
            temperature=0.2
        )

        return response.choices[0].message.content or ""