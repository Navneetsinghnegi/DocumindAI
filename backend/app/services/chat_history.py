from collections import defaultdict
from typing import List, Dict

chat_memory : Dict[str,List[dict]] = defaultdict(list)


def get_chat_history(user_id:str) -> List[dict]:
    return chat_memory[user_id]

def add_user_message(user_id:str, content:str):
    chat_memory[user_id].append({
        "role":"user",
        "content":content
    })

def add_assistant_message(user_id:str, content:str):
    chat_memory[user_id].append({
        "role":"assistant",
        "content": content
    })

def clear_chat_history(user_id:str):
    chat_memory[user_id]=[]

