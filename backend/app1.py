from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.llms import LlamaCpp
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import RetrievalQA
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

file_path = r"C:\Users\hrish\OneDrive\Desktop\saanjh_sahaayak\saanjh2\backend\DT.pdf"

# Verify the file exists
if not os.path.isfile(file_path):
    raise ValueError(f"File path {file_path} is not a valid file or URL")

# Load the PDF document
loader = PyPDFLoader(file_path)
data = loader.load()

# Split the document into chunks
text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=20)
text_chunks = text_splitter.split_documents(data)

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store = FAISS.from_documents(text_chunks, embedding=embeddings)

# Import LlamaCpp Model
llm = LlamaCpp(
    streaming=True,
    model_path=r"C:\Users\hrish\OneDrive\Desktop\saanjh_sahaayak\saanjh2\backend\mistral-7b-instruct-v0.1.Q4_K_M.gguf",  
    temperature=0.75,
    top_p=1,
    verbose=True,
    n_ctx=4096
)

# Set up the QA chain
qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vector_store.as_retriever(search_kwargs={"k": 2})
)

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({"error": "No query provided"}), 400

    try:
        # Run the query using the QA chain
        answer = qa.run(query)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)