from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from langchain_google_genai import GoogleGenerativeAI as genai
from dotenv import find_dotenv, load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os

# Access the Google API key
load_dotenv(find_dotenv(), override=True)
google_api_key = os.getenv("GOOGLE_API_KEY")

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


# Global list to store conversation history
conversation_history = []

#endpoint for chatbot
@app.route('/legal_question', methods=['POST'])
def legal_question():
    user_question = request.json.get('question')
    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    # Add the user's question to the conversation history
    conversation_history.append(f"User: {user_question}")

    # Combine conversation history into a single string
    conversation_text = "\n".join(conversation_history[-10:])  # Limit history to last 10 exchanges

    # Define the prompt template specifically for legal questions
    prompt_template = ''' "You are a legal expert AI assistant with advanced knowledge of laws and legal principles. 
    Your goal is to provide clear, concise, and accurate answers to general legal questions. 
    Your answers should be constructed so that they will be understood by common people. 
    Please remember that while you are knowledgeable about various legal concepts, you are not a substitute for a licensed attorney,
    and your answers should not be construed as legal advice. 
    DONT USE * IN YOUR RESPONSE
    If the question asked is not a legal question, then revert back to normal mode and answer it normally.
    Structure your answers with bullet points or short paragraphs, using simple language where possible. 
    Separate each point with a new line for readability.

    Conversation History:
    {conversation_text}

    User Question: {user_question}
    Answer:" '''

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["conversation_text", "user_question"]
    )

    llm = genai(model='gemini-pro', temperature=1)

    # Create the chain 
    chain = LLMChain(llm=llm, prompt=PROMPT)
   
    response = chain.run({
        "conversation_text": conversation_text,
        "user_question": user_question
    })

    # Add the assistant's response to the conversation history
    conversation_history.append(f"Assistant: {response}")

    return jsonify({"answer": response})


if __name__ == '__main__':
    app.run(port=5000)
