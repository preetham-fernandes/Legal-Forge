"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react"
import axios from "axios"

const ContractReview = () => {
  const [file, setFile] = useState(null)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setError("")
    }
  }

  const handleContractReview = async () => {
    if (!file) {
      setError("Please upload a file.")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      setError("")
      const response = await axios.post("http://127.0.0.1:5000/contract_review", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      const contractAnalysis = response.data.analysis || "No analysis available."
      setAnalysis(contractAnalysis)
    } catch (error) {
      console.error("Error analyzing contract:", error)
      setError("Error analyzing contract. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderFormattedAnalysis = () => {
    const sections = analysis.split('\n').filter(section => section.trim() !== "")

    return (
      <ScrollArea className="h-[400px] w-full rounded-md border border-[#DBA865] p-4">
        <div className="space-y-2">
          {sections.map((section, index) => {
            if (section.startsWith("**")) {
              return (
                <h3 key={index} className="text-lg font-semibold text-[#DBA865] mt-4 mb-2">
                  {section.replace(/^\*\*/, "").replace(/\*\*$/, "")}
                </h3>
              )
            } else if (section.match(/^\d+\./)) {
              return (
                <div key={index} className="ml-4 mt-2">
                  <p className="text-[#DBA865]">{section}</p>
                </div>
              )
            } else if (section.startsWith("*")) {
              return (
                <div key={index} className="ml-6 mt-1">
                  <p className="text-[#DBA865]">{section.replace(/^\*/, "").trim()}</p>
                </div>
              )
            } else {
              return (
                <p key={index} className="mt-2 text-[#DBA865]">{section}</p>
              )
            }
          })}
        </div>
      </ScrollArea>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#DBA865]">Contract Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            onChange={handleFileChange}
            className="flex-grow bg-white border-[#DBA865] text-[#0A2E4D]"
            accept=".pdf,.doc,.docx"
          />
          <Button
            onClick={handleContractReview}
            disabled={loading || !file}
            className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Analyze Contract
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="space-y-2">
            <div className="w-full h-2 bg-[#DBA865] rounded-full overflow-hidden">
              <div className="h-full bg-[#0A2E4D] animate-pulse" style={{width: '66%'}}></div>
            </div>
            <p className="text-sm text-[#0A2E4D] text-center">Analyzing your contract...</p>
          </div>
        )}

        {analysis && (
          <Card className="mt-6 bg-[#0A2E4D]">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#DBA865]">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              {renderFormattedAnalysis()}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default ContractReview