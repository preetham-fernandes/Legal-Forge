"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import LegalChatbot from "@/components/ui/legal_chatbot";
import ContractReview from "@/components/ui/contract_review";

import {
  Gavel,
  FileText,
  MessageSquare,
  Clock,
  Search,
  Menu,
  X,
  FileSignature,
  Bot,
  FileCheck,
  Calendar as CalendarIcon,
  PlusCircle,
  FileText as FileTextIcon,
} from "lucide-react";
import axios from "axios";

const features = [
  { name: "AI Document Generation", icon: FileSignature },
  { name: "Legal Chatbot", icon: Bot },
  { name: "Contract Review", icon: FileCheck },
  { name: "Case Tracking", icon: Clock },
  { name: "Consultation Booking", icon: CalendarIcon },
  { name: "Document Creation", icon: PlusCircle },
  { name: "AI Document Summary", icon: FileTextIcon },
];

export default function ClientDashboard() {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");

  const handleLogout = () => {
    router.push("/");
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const selectFeature = (feature) => {
    setSelectedFeature(feature);
    if (window.innerWidth < 768) {
      setIsNavOpen(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.data.message === "Document processed") {
        alert("Document uploaded successfully!");
      } else {
        alert("There was an error uploading the document.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Error uploading document.");
    }
  };

  const handleGenerateSummary = async () => {
    try {
      const summaryResponse = await axios.post("http://127.0.0.1:5000/ask_and_get_answer", {
        question: "Can you provide a summary of the document?",
      });

      setSummary(summaryResponse.data.answer || "No summary available.");
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Error generating summary.");
    }
  };

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

      setChatbotResponse(response.data.answer || "No response available.");
      setUserQuestion(""); // Clear input after sending the question
    } catch (error) {
      console.error("Error asking question:", error);
      alert("Error asking question.");
    }
  };

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case "AI Document Generation":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">AI-Powered Document Generation</h2>
            <Textarea placeholder="Enter your document requirements..." />
            <Button>Generate Document</Button>
          </div>
        );
      case "Legal Chatbot":
          return <LegalChatbot />;
      case "Contract Review":
        return <ContractReview />;
      case "Case Tracking":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Legal Case Tracking</h2>
            <p>Your case timeline will appear here.</p>
          </div>
        );
      case "Consultation Booking":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Book a Consultation</h2>
            <Calendar />
            <Button>Find Available Lawyers</Button>
          </div>
        );
      case "Document Creation":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create Legal Documents</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button>Create Contract</Button>
              <Button>Create Agreement</Button>
              <Button>Create Privacy Policy</Button>
              <Button>Create Terms of Service</Button>
            </div>
          </div>
        );
      case "AI Document Summary":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">AI-Generated Document Summary</h2>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleFileUpload}>Upload Document</Button>
            <Button onClick={handleGenerateSummary}>Generate Summary</Button>
            {summary && <div className="mt-4 p-4 bg-gray-100 rounded-lg"><strong>Summary:</strong> {summary}</div>}
          </div>
        );
      default:
        return (
          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, Client</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">1 new case this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">2 unread messages</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Next: Tomorrow, 2:00 PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Consultations</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
              </Card>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleNav}>
          {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <Link className="flex items-center justify-center" href="/">
          <Gavel className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Legal Forge</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-gray-800 text-white w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <nav className="p-4 space-y-2">
            {features.map((feature) => (
              <Button
                key={feature.name}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-700"
                onClick={() => selectFeature(feature.name)}
              >
                <feature.icon className="mr-2 h-4 w-4" />
                {feature.name}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          {renderFeatureContent()}
        </main>
      </div>
    </div>
  );
}
