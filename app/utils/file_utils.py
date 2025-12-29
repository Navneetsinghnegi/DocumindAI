import uuid

def generate_unique_file_name(original_name: str)->str:
    ext = original_name.split(".")[-1]
    return f"{uuid.uuid4()}.{ext}"