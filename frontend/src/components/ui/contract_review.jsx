"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, AlertCircle } from "lucide-react"
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
      <div className="space-y-2">
        {sections.map((section, index) => {
          if (section.startsWith("**")) {
            return (
              <h3 key={index} className="text-lg font-semibold text-[#0A2E4D] mt-4 mb-2">
                {section.replace(/^\*\*/, "").replace(/\*\*$/, "")}
              </h3>
            )
          } else if (section.match(/^\d+\./)) {
            return (
              <div key={index} className="ml-4 mt-2">
                <p className="text-[#0A2E4D]">{section}</p>
              </div>
            )
          } else if (section.startsWith("*")) {
            return (
              <div key={index} className="ml-6 mt-1">
                <p className="text-[#0A2E4D]">{section.replace(/^\*/, "").trim()}</p>
              </div>
            )
          } else {
            return (
              <p key={index} className="mt-2 text-[#0A2E4D]">{section}</p>
            )
          }
        })}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#DBA865]">Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            onChange={handleFileChange}
            className="flex-grow"
            accept=".pdf,.doc,.docx"
          />
          <Button
            onClick={handleContractReview}
            disabled={loading || !file}
            className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]"
          >
            {loading ? (
              <>
                <FileText className="mr-2 h-4 w-4 animate-spin" />
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
            <Progress value={66} className="w-full" />
            <p className="text-sm text-[#0A2E4D] text-center">Analyzing your contract...</p>
          </div>
        )}

        {analysis && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#DBA865]">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {renderFormattedAnalysis()}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default ContractReview
