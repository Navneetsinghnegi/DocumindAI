from pypdf import PdfReader
from docx import Document

def extract_text(file_path:str)-> str:
    if file_path.endswith(".pdf"):
        return _extract_pdf(file_path)
    elif file_path.endswith(".docx"):
        return _extract_docx(file_path)
    elif file_path.endswith(".txt"):
        return _extract_txt(file_path)
    else:
        raise ValueError("Unsupported file format")
    
def _extract_pdf(file_path:str) -> str:
    reader = PdfReader(file_path)
    text=""
    for page in reader.pages:
        text+=page.extract_text() or ""
    return text 

def _extract_docx(file_path: str) -> str:
    doc = Document(file_path)
    return "\n".join([p.text for p in doc.paragraphs])

def _extract_txt(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()