'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import LegalChatbot from "@/components/ui/legal_chatbot"
import ContractReview from "@/components/ui/contract_review"
import CreateContract from "@/components/ui/create_contract"
import Logo from "@/assets/logo.png";

import {
  Gavel,
  FileText,
  MessageSquare,
  Clock,
  Search,
  FileSignature,
  Bot,
  FileCheck,
  Calendar as CalendarIcon,
  PlusCircle,
  FileText as FileTextIcon,
} from "lucide-react"
import axios from "axios"

const features = [
  { name: "Case Tracking", icon: Clock },
  { name: "Consultation Booking", icon: CalendarIcon },
  { name: "Legal Chatbot", icon: Bot },
  { name: "Document Creation", icon: FileSignature },
  { name: "Contract Review", icon: FileCheck },
  { name: "AI Document Summary", icon: FileTextIcon },
]

export default function ClientDashboard() {
  const router = useRouter()
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState("")
  const [userQuestion, setUserQuestion] = useState("")
  const [chatbotResponse, setChatbotResponse] = useState("")

  const handleLogout = () => {
    router.push("/")
  }

  const selectFeature = (feature) => {
    setSelectedFeature(feature)
    setSelectedDocument(null)
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please upload a file first!")
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", file)

      const uploadResponse = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (uploadResponse.data.message === "Document processed") {
        alert("Document uploaded successfully!")
      } else {
        alert("There was an error uploading the document.")
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      alert("Error uploading document.")
    }
  }

  const handleGenerateSummary = async () => {
    try {
      const summaryResponse = await axios.post("http://127.0.0.1:5000/ask_and_get_answer", {
        question: "Can you provide a summary of the document?",
      })

      setSummary(summaryResponse.data.answer || "No summary available.")
    } catch (error) {
      console.error("Error generating summary:", error)
      alert("Error generating summary.")
    }
  }

  const handleQuestionChange = (event) => {
    setUserQuestion(event.target.value)
  }

  const handleAskQuestion = async () => {
    if (!userQuestion) {
      alert("Please enter a question.")
      return
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/legal_question", {
        question: userQuestion,
      })

      setChatbotResponse(response.data.answer || "No response available.")
      setUserQuestion("")
    } catch (error) {
      console.error("Error asking question:", error)
      alert("Error asking question.")
    }
  }

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case "Legal Chatbot":
        return <LegalChatbot />
      case "Contract Review":
        return <ContractReview />
      case "Case Tracking":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2E4D]">Legal Case Tracking</h2>
            <p className="text-gray-600">Your case timeline will appear here.</p>
          </div>
        )
      case "Consultation Booking":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2E4D]">Book a Consultation</h2>
            <Calendar className="bg-white rounded-lg p-2 border border-[#DBA865]" />
            <Button className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#C99754]">Find Available Lawyers</Button>
          </div>
        )
      case "Document Creation":
        if (selectedDocument === "contract") {
          return <CreateContract />
        }
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2E4D]">Create Legal Documents</h2>
            <div className="grid grid-cols-4 gap-4">
              <Button onClick={() => setSelectedDocument("contract")} className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#C99754]">Create Contract</Button>
            </div>
          </div>
        )
      case "AI Document Summary":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0A2E4D]">AI-Generated Document Summary</h2>
            <Input type="file" onChange={handleFileChange} className="bg-white border-[#DBA865]" />
            <Button onClick={handleFileUpload} className="mr-4 bg-[#DBA865] text-[#0A2E4D] hover:bg-[#C99754]">Upload Document</Button>
            <Button onClick={handleGenerateSummary} className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#C99754]">Generate Summary</Button>
            {summary && <div className="mt-4 p-4 bg-[#0A2E4D] rounded-lg text-white"><strong>Summary:</strong> {summary}</div>}
          </div>
        )
      default:
        return (
          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#0A2E4D]">Welcome, Client</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Active Cases", icon: FileText, value: 3, subtext: "1 new case this month" },
                { title: "Messages", icon: MessageSquare, value: 8, subtext: "2 unread messages" },
                { title: "Upcoming Appointments", icon: Clock, value: 2, subtext: "Next: Tomorrow, 2:00 PM" },
                { title: "AI Consultations", icon: Search, value: 15, subtext: "+5 from last month" },
              ].map((item, index) => (
                <Card key={index} className="bg-[#0A2E4D] text-white border-[#DBA865]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <item.icon className="h-4 w-4 text-[#DBA865]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-gray-300">{item.subtext}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#DBA865] bg-[#0A2E4D]">
      <Link className="flex items-center justify-center" href="/">
          {/* Logo Image */}
          <Image
            src={Logo}
            alt="Legal Forge Logo"
            className="h-[6vh] w-[30vh]"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="border-[#DBA865] text-[#DBA865] hover:bg-[#DBA865] hover:text-[#0A2E4D]"
          >
            Logout
          </Button>
        </nav>
      </header>
      <div className="flex flex-1 overflow-hidden">
      <aside
          className={`bg-[#0A2E4D] text-white w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out translate-x-0" 
           md:translate-x-0 border-r border-[#DBA865]`}
        >
          <nav className="p-4 space-y-2">
            {features.map((feature) => (
              <Button
                key={feature.name}
                variant="ghost"
                className="w-full justify-start text-[#DBA865] hover:bg-[#DBA865] hover:text-[#0A2E4D]"
                onClick={() => selectFeature(feature.name)}
              >
                <feature.icon className="mr-2 h-4 w-4" />
                {feature.name}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {renderFeatureContent()}
        </main>
      </div>
    </div>
  )
}