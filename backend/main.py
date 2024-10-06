from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from langchain_google_genai import GoogleGenerativeAI as genai
from dotenv import find_dotenv, load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Access the Google API key
load_dotenv(find_dotenv(), override=True)

app = Flask(__name__)
CORS(app)

document_text = ""

# Endpoint for document upload and processing
@app.route('/upload', methods=['POST'])
def upload_document():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']

    # Extract text from PDF
    with pdfplumber.open(file) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()

    # Save text for later use
    global document_text
    document_text = text
    print("Extracted document text:", document_text[:100])
    return jsonify({"message": "Document processed"}), 200

# Endpoint for asking questions
@app.route('/ask_and_get_answer', methods=['POST'])
def ask_and_get_answer():
    user_question = request.json.get('question')
    #print(f"Mark{user_question}, {document_text}")
    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    # Define the prompt template
    prompt_template = ''' "You are an advanced legal chatbot with a deep understanding of various legal concepts and terminologies. "
            "Your task is to provide concise and accurate answers to user questions based on the provided document text.\n\n"
            "Instructions:\n"
            "1. Carefully analyze the following document text.\n"
            "2. Provide a direct answer to the user's question.\n"
            "3. Ensure your answer is informative, clear, and relevant to the user's inquiry.\n\n"
            "Document Text: {document_text}\n\n"
            "User Question: {user_question}\n\n"
            "Answer:" '''
    
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["document_text","user_question"]
    )

    llm = genai(model='gemini-pro', temperature=1)
    
    # Create the chain, ensuring it uses the correct input variable
    chain = LLMChain(llm=llm, prompt=PROMPT)
   
    response = chain.run({
           "document_text": document_text,
           "user_question": user_question
           }) 

    #print(f"Mark: {response}")
    return jsonify({"answer": response})

if __name__ == '__main__':
    app.run(port=5000)
