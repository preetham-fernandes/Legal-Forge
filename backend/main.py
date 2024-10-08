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
    print("Extracted document text:", document_text[:100])  # Log first 100 characters
    return jsonify({"message": "Document processed"}), 200

# Endpoint for asking questions based on uploaded document
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

# Endpoint for legal questions
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

# Endpoint for contract creation
@app.route('/create_contract', methods=['POST'])
def create_contract():
    try:
        data = request.json
        print("Received contract data:", data)  # Log incoming data
        
        # Extract fields from the incoming data
        landlord_name = data.get('landlord_name', '')
        landlord_address = data.get('landlord_address', '')
        tenant_name = data.get('tenant_name', '')
        tenant_address = data.get('tenant_address', '')
        property_details = data.get('property_details', '')
        lease_term = data.get('lease_term', '')
        security_deposit = data.get('security_deposit', '')
        rent_amount = data.get('rent_amount', '')
        payment_frequency = data.get('payment_frequency', '')
        date = data.get('date', '')
        
        # Check if all required fields are provided
        if not all([landlord_name, landlord_address, tenant_name, tenant_address, property_details, lease_term, security_deposit, rent_amount, payment_frequency, date]):
            return jsonify({"error": "Missing required fields"}), 400

        # Define the prompt for generating a contract based on the input details
        prompt_template = f'''You are an advanced AI assistant tasked with drafting a lease agreement based on the following details:
        Landlord Name: {landlord_name}
        Landlord Address: {landlord_address}
        Tenant Name: {tenant_name}
        Tenant Address: {tenant_address}
        Property Details: {property_details}
        Lease Term: {lease_term}
        Security Deposit: {security_deposit}
        Rent Amount: {rent_amount}
        Payment Frequency: {payment_frequency}
        Date: {date}

        Structure your response as a professional legal document like the one below:

        This Deed of Lease is made at {date} between {landlord_name} of {landlord_address}, hereinafter called 'The Lessor' of the One Part and {tenant_name} of {tenant_address}, hereinafter called 'The Lessee' of the Other Part.
        WHEREAS, the Lessor is absolutely seized and possessed of or otherwise well and sufficiently entitled to the land and premises described in the Schedule hereunder written.
        AND WHEREAS, the Lessor has agreed to grant to the Lessee a lease in respect of the said land and premises for a term of {lease_term} years in the manner hereinafter appearing.
        Now This Deed Witnesseth as Follows:
        1. In pursuance of the said agreement and in consideration of the rent hereby reserved and of the terms and conditions, covenants and agreements herein contained and on the part of the Lessee to be observed and performed, the Lessor doth hereby demise unto the Lessee all that the said land and premises situated at {property_details} (hereinafter for the brevity's sake referred to as 'the demised premises') to hold the demised premises unto the Lessee (and his heirs, executors, administrators, and assigns) for a term of {lease_term} years commencing from the {date}, but subject to the earlier determination of this demise as hereinafter provided and yielding and paying therefor during the said term the monthly ground rent of Rs {rent_amount} free and clear of all deductions and strictly in advance on or before the 5th day of each and every calendar month. The first of such monthly ground rent shall be paid on the 5th day of {date} and the subsequent rent to be paid on or before the 5th day of every succeeding month regularly.
        2. The Lessee hereby for himself, his heirs, executors, administrators, and assigns and to the intent that the obligations herein contained shall continue throughout the term hereby created covenants with the Lessor as follows:
        a. To pay the ground rent hereby reserved on the days and in the manner aforesaid clears of all deductions. The first of such monthly rent as hereinbefore provided shall be paid on the 5th of {date} and the subsequent rent shall be paid on the 5th day of every succeeding month regularly, and if the ground rent is not paid on the due dates, the Lessee shall pay interest thereon at the rate of .... % per annum from the due date till payment, though the payment of Interest shall not entitle the Lessee to make default in payment of rent on due dates.
        b. To bear, pay, and discharge the existing and future rates, taxes, assessment duties, cess, impositions, outgoing and burdens whatsoever which may at any time or from time to time during the term hereby created be imposed or charged upon the demised land and the building or structures standing thereon and on the buildings or structures hereafter to be erected and for the time being standing on the demised land and payable either by the owners, occupiers, or tenants thereof and to keep the Lessor and his estate and effects indemnified against all such payment. The annual Municipal and other taxes at present are Rs ..........
        c. To keep the buildings and structures on the demised premises in good and tenantable repairs in the same way as the Lessor is liable to do under the law provided that if the Lessee so desires he shall have power to demolish any existing building or structure without being accountable to the Lessor for the building material of such building and structure and the Lessee shall have also power to construct any new buildings in their place.
        d. The Lessee shall be at liberty to carry out any additions or alterations to the buildings or structures at present existing on the demised premises or to put up any additional structures or buildings on the demised premises in accordance with the plans approved by the authorities at any time or from time to time during the subsistence of the term hereby created.
        e. Not to sell or dispose of any earth, gravel, or sand from the demised land and not to excavate the same except so far as may be necessary for the execution of construction work.
        f. To use or permit to be used the buildings and structures to be constructed on the demised premises for any and all lawful purposes as may be permitted by the authorities from time to time.
        3. The Lessor doth hereby covenant with the Lessee that:
        a. the Lessor now has in himself good right full power and absolute authority to demise unto the Lessee the demised premises and the buildings and structures standing thereon in the manner herein appearing ..........
        b. that on the Lessee paying the said monthly ground rent on the due dates thereof and in the manner herein provided and observing and performing the covenants, conditions, and stipulations herein contained and on his part to be observed and performed shall and may peaceably and quietly hold, possess and enjoy the demised premises together with the buildings and structures standing thereon during the term hereby created without any eviction, interruption, disturbance, claim, and demand whatsoever by the Lessor or any person or persons lawfully or equitably claiming by, from, under or in trust for him.
        4. It is hereby agreed and declared that these presents are granted on the express condition that if the said monthly ground rent or any part thereof payable in the manner hereinbefore mentioned shall be in arrears for the space of ..... months after the same shall have become due and payable on any of the said days wherein the same ought to be paid as aforesaid whether the same shall or shall not be legally demanded or if any of the covenants and stipulations herein contained and on the part of the Lessee to be observed and performed shall not be so observed and performed by the Lessee or if the Lessee shall raise an objection to the amount of the monthly ground rent hereby fixed for any reason whatsoever then and in such event it shall be lawful for the Lessor or any person or persons duly authorised by him in that behalf at any time hereafter to enter into and upon the land and premises and the buildings and structures constructed or to be constructed thereon or any part or parts thereof in the name of the whole and the same to have, possess and enjoy and thereupon this demise shall absolutely determine but without prejudice to the right of action of the Lessor in respect of any breach of any of the covenants by the Lessee herein contained PROVIDED ALWAYS that, no re-entry shall be made under the foregoing power for breach of the covenants and stipulations herein contained and on the part of the Lessee to be observed and performed (save and except the covenant for payment of rent) unless and until the Lessor shall have given to the Lessee a notice in writing specifying the covenants and conditions or stipulations which require to be complied with or carried out and the Lessee shall have failed to comply with or carry out the same within .... month from the date of the receipt of by such notice.
        5. And it is hereby expressly agreed and declared between the parties as follows:
        a. On the expiration of the term hereby created or earlier determination under the provisions hereof, all the buildings and structures standing on the demised land shall automatically vest in the Lessor without payment of any compensation therefor by the Lessor to the Lessee.
        b. The Lessee shall not be entitled, without obtaining in writing the permission of the Lessor, to assign, mortgage, sublet (except to the extent of creating monthly tenancies) or otherwise part with possession of the demised premises or any of them or any part thereof and the buildings and structures standing thereon though such permission shall not be unreasonably withheld.

        IN WITNESS WHEREOF the Lessor and the Lessee have put their respective hands on the original and duplicate hereof the day and year first herein above written.
        THE SCHEDULE ABOVE REFERRED TO
        Signed and delivered by the
        Withinnamed Lessor ........ in the presence of ........
        Signed and delivered by the
        Within named Lessee ........ in the presence of ........
        Lease Agreement:'''


        PROMPT = PromptTemplate(
            template=prompt_template, input_variables=[]
        )

        llm = genai(model='gemini-pro', temperature=1)

        # Create the chain 
        chain = LLMChain(llm=llm, prompt=PROMPT)

        response = chain.run({})

        return jsonify({"contract": response})

    except Exception as e:
        print("Error in create_contract:", e)
        return jsonify({"error": "Error creating contract"}), 500
    

@app.route('/get_cases', methods=['POST'])
def get_cases():
    user_case_description = request.json.get('case_description')
    if not user_case_description:
        return jsonify({"error": "No case description provided"}), 400

    prompt_template = '''
    You are a legal assistant. A lawyer has provided a case description, and you need to find similar precedents. 
    The cases should be created based on laws in India.
    Please provide details for each relevant case:
    1. Case Name
    2. Client Information
    3. Status of the case
    4. Description
    5. Summary
    6. Judges' Final Outcome
    
    Case Description: {case_description}
    '''

    formatted_prompt = prompt_template.format(case_description=user_case_description)
    llm = genai(model='gemini-pro', temperature=1)

    response_text = llm(formatted_prompt).replace('*', '').strip()

    cases = []
    case_entries = response_text.split("\n\n")  # Split into individual case entries
    for case_data in case_entries:
        if case_data.strip():  # Ensure there is data to process
            parts = case_data.split("\n")  # Split the case data into lines
            case = {
                "title": parts[0].replace("Case Name:", "").strip() if len(parts) > 0 else "N/A",
                "client_information": {
                    "plaintiff": "N/A",
                    "defendant": "N/A"
                },
                "status": "N/A",
                "description": "N/A",
                "summary": "N/A",
                "judges_final_outcome": "N/A"
            }
            
            # Check for client information (parts[1]) and update accordingly
            if len(parts) > 1:
                client_info = parts[1].strip()
                if "Client Information:" in client_info:
                    clients = client_info.split(';')
                    case["client_information"]["plaintiff"] = next((p.replace("Plaintiff:", "").strip() for p in clients if "Plaintiff:" in p), "N/A")
                    case["client_information"]["defendant"] = next((d.replace("Defendant:", "").strip() for d in clients if "Defendant:" in d), "N/A")

            # Check for other parts and update case details
            if len(parts) > 2:
                case["status"] = parts[2].replace("Status of the case:", "").strip()
            if len(parts) > 3:
                case["description"] = parts[3].replace("Description:", "").strip()
            if len(parts) > 4:
                case["summary"] = parts[4].replace("Summary:", "").strip()
            if len(parts) > 5:
                case["judges_final_outcome"] = parts[5].replace("Judges' Final Outcome:", "").strip()
                
            cases.append(case)

    return jsonify({"cases": cases}), 200


if __name__ == '__main__':
    app.run(debug=True)
