"use client"; // Mark this file as a client component

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; 
import { Textarea } from "@/components/ui/textarea"; 

const Chatbot = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Document uploaded successfully');
        // Optionally handle the response if needed
      } else {
        const errorData = await response.json();
        console.error('Failed to upload document:', errorData.error);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      console.error('Question cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/ask_and_get_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnswer(data.answer);
      } else {
        const errorData = await response.json();
        console.error('Failed to get answer:', errorData.error);
      }
    } catch (error) {
      console.error('Error getting answer:', error);
    }
  };

  return (
    <div className="chatbot-container p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Legal Chatbot</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 border p-2 rounded" 
      />
      <Button onClick={handleUpload} className="mb-4">Upload Document</Button>
      
      <Textarea
        placeholder="Ask a legal question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleAskQuestion}>Send</Button>
      
      {answer && <div className="mt-4"><strong>Answer:</strong> {answer}</div>}
    </div>
  );
};

export default Chatbot;
