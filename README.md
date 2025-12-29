
# 📄 DocuMind AI — Secure RAG Document Assistant

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Hugging%20Face-FF9D00?logo=huggingface&logoColor=white)](https://nav12032004-ai-document-summariser.hf.space)
[![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

**DocuMind AI** is a production-grade **Retrieval-Augmented Generation (RAG)** system that allows authenticated users to upload documents and interact with them conversationally.  
The system ensures **user data isolation**, **secure authentication**, and **context-aware Q&A**, deployed on **Hugging Face Spaces using Docker**.

---

## 🚀 Key Features

### 🔐 Authentication & Security
- JWT-based authentication (Register / Login)
- Secure password hashing with `bcrypt`
- Per-user data isolation (no cross-user leakage)

### 📂 Document Processing & RAG
- Upload and parse documents (TXT / PDF)
- Intelligent text chunking
- Semantic embeddings using `huggingface/zephyr-7b-beta`
- FAISS (CPU) for fast similarity search
- **User-scoped vector stores**

### 💬 Conversational AI
- Context-aware question answering
- In-memory chat history for follow-up questions
- Grounded answers strictly from uploaded documents
- Clean fallback: *“I don’t know”* if context is missing

### 🐳 Deployment
- Dockerized backend + frontend
- Hosted on **Hugging Face Spaces**
- Streamlit UI for fast interaction & testing
- FastAPI backend with OpenAPI docs

---

## 🛠️ Tech Stack

### Backend
- **FastAPI**
- **SQLAlchemy**
- **Alembic**
- **PostgreSQL (Supabase)**

### AI / ML
- **Sentence Transformers**
- **FAISS (CPU)**
- **Hugging Face Inference API**

### Frontend
- **Streamlit**

### DevOps
- **Docker**
- **Hugging Face Spaces**

---
