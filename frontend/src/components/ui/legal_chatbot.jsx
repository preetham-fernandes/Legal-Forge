// components/LegalChatbot.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export default function LegalChatbot() {
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleQuestionChange = (event) => {
    setUserQuestion(event.target.value);
  };

  const handleAskQuestion = async () => {
    if (!userQuestion) {
      alert("Please enter a question.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/legal_question", {
        question: userQuestion,
      });

      const answer = response.data.answer || "No response available.";

      // Update chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { question: userQuestion, answer },
      ]);

      setUserQuestion(""); // Clear input after sending the question
    } catch (error) {
      console.error("Error asking question:", error);
      alert("Error asking question.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Legal Chatbot</h2>
      <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
        {chatHistory.map((entry, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold text-blue-600">You: {entry.question}</p>
            <p className="text-gray-800">
              Assistant:
              {entry.answer.split('\n').map((line, idx) => (
                line.trim() ? (
                  <span key={idx} className="block ml-4">
                    • {line}
                  </span>
                ) : (
                  <span key={idx} className="block ml-4"></span>
                )
              ))}
            </p>
          </div>
        ))}
      </div>
      <Textarea
        value={userQuestion}
        onChange={handleQuestionChange}
        placeholder="Ask your legal question here..."
      />
      <Button onClick={handleAskQuestion}>Ask</Button>
    </div>
  );
}
