"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";

export default function CreateContract() {
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState(""); // State to hold the generated contract

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleCreateContract = async () => {
    if (!details) {
      alert("Please provide contract details.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Send the details to the backend to generate the contract
      const response = await fetch("http://localhost:5000/create_contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ details }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate contract");
      }

      const data = await response.json();
      const cleanContract = data.contract.replace(/\*/g, ""); // Remove asterisks from the contract
      setGeneratedContract(cleanContract); // Set the cleaned generated contract in state

      // Generate and download the PDF
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(cleanContract, 190); // Adjust width accordingly
      doc.text(lines, 10, 10);
      doc.save("contract.pdf");

    } catch (error) {
      alert(error.message); // Handle errors gracefully
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Contract</h2>
      <div>
        <label htmlFor="details" className="block font-medium">Contract Details</label>
        <Input 
          type="text" 
          id="details" 
          value={details} 
          onChange={handleDetailsChange} 
          placeholder="Enter contract details here" 
        />
      </div>
      <Button onClick={handleCreateContract} disabled={loading}>
        {loading ? "Generating Contract..." : "Create Contract"}
      </Button>

      {generatedContract && (
        <div className="mt-4">
          <h3 className="font-bold">Generated Contract:</h3>
          <pre className="whitespace-pre-wrap">{generatedContract}</pre>
        </div>
      )}
    </div>
  );
}
