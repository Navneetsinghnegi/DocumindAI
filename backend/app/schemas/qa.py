from pydantic import BaseModel
from typing import List

class AskRequest(BaseModel):
    question:str

class AskResponse(BaseModel):
    question:str
    answer:str
    sources:List[str]