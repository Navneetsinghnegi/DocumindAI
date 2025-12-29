#!/bin/bash

# 1. Start Backend
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 &

# 2. Wait for backend
sleep 5

# 3. Start Frontend
# UPDATE THIS LINE to match your actual file path!
# Example: if your file is 'frontend/main.py'
streamlit run frontend/app.py --server.port 7860 --server.address 0.0.0.0