// components/ContractReview.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function ContractReview() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleContractReview = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/contract_review", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const contractAnalysis = response.data.analysis || "No analysis available.";
      setAnalysis(contractAnalysis);
      setLoading(false);
    } catch (error) {
      console.error("Error analyzing contract:", error);
      alert("Error analyzing contract.");
      setLoading(false);
    }
  };

  const renderFormattedAnalysis = () => {
    // Assuming the analysis uses new lines and labels like "1. Consideration" to structure content
    const sections = analysis.split('\n').filter(section => section.trim() !== "");

    return (
      <div>
        {sections.map((section, index) => {
          if (section.startsWith("**")) {
            // Making section titles bold
            return (
              <h3 key={index} className="font-semibold mt-2 mb-1">{section.replace(/^\*\*/, "").replace(/\*\*$/, "")}</h3>
            );
          } else if (section.match(/^\d+\./)) {
            // List items with a numbered format (clauses)
            return (
              <div key={index} className="ml-4 mt-1">
                <p>{section}</p>
              </div>
            );
          } else if (section.startsWith("*")) {
            // Bullet points
            return (
              <div key={index} className="ml-6">
                <p>{section.replace(/^\*/, "").trim()}</p>
              </div>
            );
          } else {
            // Regular paragraphs
            return (
              <p key={index} className="mt-1">{section}</p>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contract Review</h2>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleContractReview} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Contract"}
      </Button>

      {analysis && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="font-bold">Analysis:</h3>
          {renderFormattedAnalysis()}
        </div>
      )}
    </div>
  );
}
