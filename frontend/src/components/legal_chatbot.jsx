"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Loader2, Send, User, Bot } from "lucide-react"
import axios from "axios"

export default function LegalChatbot() {
  const [userQuestion, setUserQuestion] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hello! I'm your AI legal assistant. How can I help you today?" }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleQuestionChange = (event) => {
    setUserQuestion(event.target.value)
  }

  const handleAskQuestion = async () => {
    if (!userQuestion.trim()) {
      return
    }

    const newUserMessage = { role: "user", content: userQuestion }
    setChatHistory(prev => [...prev, newUserMessage])
    setUserQuestion("")
    setIsLoading(true)

    try {
      const response = await axios.post("http://127.0.0.1:5000/legal_question", {
        question: userQuestion,
      })

      const answer = response.data.answer || "I'm sorry, I couldn't process that request. Could you please rephrase your question?"
      const newAssistantMessage = { role: "assistant", content: answer }
      setChatHistory(prev => [...prev, newAssistantMessage])
    } catch (error) {
      console.error("Error asking question:", error)
      const errorMessage = { 
        role: "assistant", 
        content: "I apologize, but I encountered an error while processing your request. Please try again later." 
      }
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleAskQuestion()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#DBA865]">Legal AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] p-4 rounded-md border border-[#DBA865]" ref={scrollAreaRef}>
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className={`${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                  {message.role === 'user' ? (
                    <User src="/placeholder.svg?height=40&width=40" alt="User" />
                  ) : (
                    <Bot className="h-6 w-6 text-[#DBA865]" />
                  )}
                </Avatar>
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user' ? 'bg-[#DBA865] text-[#0A2E4D]' : 'bg-[#0A2E4D] text-white'
                }`}>
                  {message.content.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-1">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center space-x-2">
          <Textarea
            value={userQuestion}
            onChange={handleQuestionChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask your legal question here..."
            className="flex-grow"
          />
          <Button 
            onClick={handleAskQuestion} 
            disabled={isLoading || !userQuestion.trim()} 
            className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}