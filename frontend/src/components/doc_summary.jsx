"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Upload, FileText, CheckCircle } from "lucide-react"
import axios from "axios"

export default function DocSummary() {
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
    setUploadSuccess(false)
  }

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.message === "Document processed") {
        setUploadSuccess(true)
      } else {
        alert("There was an error uploading the document.")
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      alert("Error uploading document.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleGenerateSummary = async () => {
    if (!uploadSuccess) {
      alert("Please upload a document first.")
      return
    }

    setIsGenerating(true)
    try {
      const response = await axios.post("http://127.0.0.1:5000/ask_and_get_answer", {
        question: "Can you provide a summary of the document?",
      })

      setSummary(response.data.answer || "No summary available.")
    } catch (error) {
      console.error("Error generating summary:", error)
      alert("Error generating summary.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full h-[85vh] max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#DBA865]">AI-Generated Document Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            onChange={handleFileChange}
            className="flex-grow bg-white border-[#DBA865] text-[#0A2E4D]"
            accept=".pdf,.doc,.docx,.txt"
          />
          <Button
            onClick={handleFileUpload}
            disabled={isUploading || !file}
            className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#C99754]"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Upload
          </Button>
        </div>
        {uploadSuccess && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            Document uploaded successfully
          </div>
        )}
        <Button
          onClick={handleGenerateSummary}
          disabled={isGenerating || !uploadSuccess}
          className="w-full bg-[#DBA865] text-[#0A2E4D] hover:bg-[#C99754]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Summary...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate Summary
            </>
          )}
        </Button>
        {summary && (
          <Card className="mt-4 bg-[#0A2E4D] text-white h-[50vh]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Document Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                {summary.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">{paragraph}</p>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}