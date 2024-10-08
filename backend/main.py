from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
from langchain_google_genai import GoogleGenerativeAI as genai
from dotenv import find_dotenv, load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os

# Load the Google API key from environment variables
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
            text += page.extract_text() or ""

    # Save text for later use
    global document_text
    document_text = text
    print("Extracted document text:", document_text[:100])
    return jsonify({"message": "Document processed"}), 200

# Endpoint for asking questions
@app.route('/ask_and_get_answer', methods=['POST'])
def ask_and_get_answer():
    user_question = request.json.get('question')
    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    # Define the prompt template
    prompt_template = '''You are an advanced legal chatbot with a deep understanding of various legal concepts and terminologies.
            Your task is to provide concise and accurate answers to user questions based on the provided document text.

            Instructions:
            1. Carefully analyze the following document text.
            2. Provide a direct answer to the user's question.
            3. Ensure your answer is informative, clear, and relevant to the user's inquiry.

            Document Text: {document_text}

            User Question: {user_question}
            Answer:'''

    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["document_text", "user_question"]
    )

    llm = genai(model='gemini-pro', temperature=1)
    
    # Create the chain
    chain = LLMChain(llm=llm, prompt=PROMPT)

    response = chain.run({
        "document_text": document_text,
        "user_question": user_question
    })

    return jsonify({"answer": response})

# Global list to store conversation history
conversation_history = []

# Endpoint for chatbot
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
    prompt_template = '''You are a legal expert AI assistant with advanced knowledge of laws and legal principles.
    Your goal is to provide clear, concise, and accurate answers to general legal questions.
    Your answers should be constructed so that they will be understood by common people.
    Please remember that while you are knowledgeable about various legal concepts, you are not a substitute for a licensed attorney,
    and your answers should not be construed as legal advice.
    If the question asked is not a legal question, then revert back to normal mode and answer it normally.
    Structure your answers with bullet points or short paragraphs, using simple language where possible.
    Separate each point with a new line for readability.

    Conversation History:
    {conversation_text}

    User Question: {user_question}
    Answer:'''

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

# Endpoint for contract review
@app.route('/contract_review', methods=['POST'])
def contract_review():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    try:
        # Process the PDF file with pdfplumber
        with pdfplumber.open(file) as pdf:
            text = ''
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:  # Only add if there's text on the page
                    text += page_text

        # Log the extracted text to ensure it's being retrieved
        print("Extracted contract text:", text[:200])  # Print first 200 characters for verification

        if not text:
            return jsonify({"error": "No text could be extracted from the PDF"}), 400

        # Analyze contract text using your chosen language model
        prompt_template = '''You are an advanced legal assistant specializing in contract analysis.
        Your task is to review the contract text provided and identify any potential issues, clauses, and overall relevance.
        Please summarize your findings, highlighting any red flags and important clauses.
        Respond in a clear, professional manner that can be understood by a general audience. 
        Contract Text: {contract_text}

        Analysis:'''
        
        PROMPT = PromptTemplate(
            template=prompt_template, input_variables=["contract_text"]
        )
        
        llm = genai(model='gemini-pro', temperature=1)
        chain = LLMChain(llm=llm, prompt=PROMPT)
        
        response = chain.run({
            "contract_text": text
        })

        # Log the response to verify the AI's output
        print("AI Analysis Response:", response)

        if not response:
            return jsonify({"error": "AI returned no analysis"}), 500

        return jsonify({"analysis": response})

    except Exception as e:
        print("Error processing contract:", e)
        return jsonify({"error": "Error analyzing contract"}), 500

@app.route('/create_contract', methods=['POST'])
def create_contract():
    contract_details = request.json.get('details', 'No specific details provided.')

    # Define the prompt for generating a contract based on the input details
    prompt_template = '''You are an advanced AI assistant tasked with drafting a contract based on the following details:
    {contract_details}

    Structure your response as a professional legal document, including necessary sections like:
    - Parties involved
    - Terms and conditions
    - Obligations
    - Payment terms
    - Confidentiality
    - Termination
    - Signatures

    Please ensure the contract is clear, concise, and professionally written. Avoid using any bullet points, and use standard contract language.'''
    
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["contract_details"]
    )
    
    llm = genai(model='gemini-pro', temperature=1)
    chain = LLMChain(llm=llm, prompt=PROMPT)

    # Generate the contract text
    response = chain.run({
        "contract_details": contract_details
    })

    # If no response was generated, handle it accordingly
    if not response:
        return jsonify({"error": "AI returned no contract text"}), 500

    # Return the generated contract in JSON format
    return jsonify({"contract": response})

if __name__ == "__main__":
    app.run(debug=True)
