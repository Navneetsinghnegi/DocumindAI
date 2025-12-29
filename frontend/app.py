import streamlit as st
import requests

# -----------------------------
# Configuration
# -----------------------------
API_BASE = "http://127.0.0.1:8000/api/v1"
st.set_page_config(page_title="AI Document Q&A", layout="wide")

# -----------------------------
# Session State Initialization
# -----------------------------
if "token" not in st.session_state:
    st.session_state.token = None

if "chat" not in st.session_state:
    st.session_state.chat = []

# -----------------------------
# Helper Functions
# -----------------------------
def auth_headers():
    return {
        "Authorization": f"Bearer {st.session_state.token}"
    }

# -----------------------------
# Sidebar — Authentication & Actions
# -----------------------------
st.sidebar.title("🔐 Authentication")

if not st.session_state.token:
    # --- LOGGED OUT STATE ---
    auth_mode = st.sidebar.radio("Choose Mode", ["Login", "Register"])

    email = st.sidebar.text_input("Email")
    password = st.sidebar.text_input("Password", type="password")

    if st.sidebar.button(auth_mode):
        try:
            if auth_mode == "Login":
                # LOGIN: Must use 'data=' (Form Data) and map email to 'username'
                res = requests.post(
                    API_BASE + "/auth/login",
                    data={"username": email, "password": password} 
                )
            else:
                # REGISTER: Must use 'json=' and standard fields
                res = requests.post(
                    API_BASE + "/auth/register",
                    json={"email": email, "password": password}
                )

            # Handle Response
            if res.status_code == 200:
                if auth_mode == "Login":
                    st.session_state.token = res.json()["access_token"]
                    st.success("Logged in successfully!")
                    st.rerun()
                else:
                    st.success("Registered successfully! Please login.")
            else:
                try:
                    error_detail = res.json().get("detail", res.text)
                    st.error(f"Error: {error_detail}")
                except:
                    st.error(f"Error: {res.text}")
                    
        except Exception as e:
            st.error(f"Connection Failed: {e}")

else:
    # --- LOGGED IN STATE ---
    st.sidebar.success(f"✅ Logged in")
    
    st.sidebar.divider()
    
    # [NEW] Clear Conversation Button (Connected to Backend)
    if st.sidebar.button("🧹 Clear Conversation"):
        try:
            # 1. Tell Backend to forget history
            requests.delete(
                API_BASE + "/ask/history",
                headers=auth_headers()
            )
            # 2. Clear Frontend UI
            st.session_state.chat = []
            st.success("Conversation cleared!")
            st.rerun()
        except Exception as e:
            st.sidebar.error(f"Failed to clear history: {e}")

    st.sidebar.divider()

    if st.sidebar.button("Logout"):
        st.session_state.token = None
        st.session_state.chat = []
        st.rerun()

# -----------------------------
# Main Application (Protected)
# -----------------------------
if st.session_state.token:

    st.title("📄 AI Document Assistant")
    st.markdown("Upload documents and ask questions with citation support.")

    # -------- Upload Section --------
    with st.expander("📤 Upload New Document", expanded=True):
        uploaded_file = st.file_uploader("Choose a PDF or Text file", type=["txt", "pdf"])

        if uploaded_file and st.button("Upload & Process"):
            with st.spinner("Uploading and indexing..."):
                try:
                    res = requests.post(
                        API_BASE + "/upload/",
                        headers=auth_headers(),
                        files={"file": uploaded_file}
                    )

                    if res.status_code == 200:
                        data = res.json()
                        st.success(f"✅ Uploaded! Added {data.get('chunks_added', 'some')} chunks to your knowledge base.")
                    else:
                        st.error(f"Upload failed: {res.text}")
                except Exception as e:
                    st.error(f"Connection Error: {e}")

    st.divider()

    # -------- Chat Interface --------
    st.subheader("💬 Chat")

    # 1. Display Chat History
    for msg in st.session_state.chat:
        with st.chat_message(msg["role"]):
            st.write(msg["content"])
            
            # If the message has sources, render them
            if "sources" in msg and msg["sources"]:
                with st.expander("📚 Relevant Sources"):
                    for source in msg["sources"]:
                        st.info(source)

    # 2. Handle New User Input
    question = st.chat_input("Ask something about your documents...")

    if question:
        # Display User Message immediately in UI
        st.chat_message("user").write(question)
        
        # Add to local state (so it persists on rerun)
        st.session_state.chat.append({"role": "user", "content": question})

        with st.spinner("Thinking..."):
            try:
                # Call the /ask endpoint
                res = requests.post(
                    API_BASE + "/ask",
                    headers=auth_headers(),
                    json={"question": question}
                )

                if res.status_code == 200:
                    data = res.json()
                    answer = data["answer"]
                    sources = data.get("sources", [])

                    # Display Assistant Response
                    with st.chat_message("assistant"):
                        st.write(answer)
                        if sources:
                            with st.expander("📚 Relevant Sources"):
                                for source in sources:
                                    st.info(source)

                    # Update Session State with Answer AND Sources
                    st.session_state.chat.append({
                        "role": "assistant", 
                        "content": answer,
                        "sources": sources
                    })
                
                else:
                    st.error(f"Error {res.status_code}: {res.text}")

            except Exception as e:
                st.error(f"Connection Error: {e}")

else:
    st.info("👈 Please Login or Register from the sidebar to continue.")