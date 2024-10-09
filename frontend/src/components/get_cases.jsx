"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea"; // Ensure this component is implemented correctly
import axios from "axios";

export default function GetCases() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");

  const fetchCases = async () => {
    if (!caseDescription.trim()) return; // Prevent fetching without input

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_cases", {
        case_description: caseDescription,
      });
      const fetchedCases = response.data.cases || [];
      setCases(fetchedCases);
      setFilteredCases(fetchedCases);
    } catch (error) {
      console.error("Error fetching cases:", error);
      alert("Error fetching cases."); 
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = cases.filter((caseItem) =>
      caseItem.title.toLowerCase().includes(query) ||
      (caseItem.client_information?.plaintiff?.toLowerCase().includes(query) || "") ||
      (caseItem.client_information?.defendant?.toLowerCase().includes(query) || "")
    );
    setFilteredCases(filtered);
  };

  const renderCaseDetails = (caseItem, index) => {
    // Count N/A fields
    const naCount = [
      !caseItem.client_information?.plaintiff,
      !caseItem.status,
      !caseItem.description,
      !caseItem.summary,
      !caseItem.outcome,
    ].filter(Boolean).length; // Count true values (N/A)

    // If more than 2 fields are N/A, do not render case details
    if (naCount > 2) return null;

    return (
      <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
        <h3 className="font-semibold text-lg mb-2 text-[#DBA865]">{`Case ${index + 1}`}</h3>
        <h4 className="font-semibold mb-2">{caseItem.title}</h4>
        {caseItem.client_information?.plaintiff && (
          <p>
            <strong>Client Information:</strong> {caseItem.client_information.plaintiff}, the plaintiff, sustained burns due to a faulty washing machine manufactured by XYZ Electronics.
          </p>
        )}
        {caseItem.status && (
          <p><strong>Status of the Case:</strong> {caseItem.status}</p>
        )}
        {caseItem.description && (
          <p><strong>Description:</strong> {caseItem.description}</p>
        )}
        {caseItem.summary && (
          <p><strong>Summary:</strong> {caseItem.summary}</p>
        )}
        {caseItem.outcome && (
          <p><strong>Judges' Final Outcome:</strong> {caseItem.outcome}</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (caseDescription) {
      fetchCases(); // Fetch cases when the case description is updated
    }
  }, [caseDescription]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Get Relevant Cases</h2>
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="Enter case description"
          value={caseDescription}
          onChange={(e) => setCaseDescription(e.target.value)}
          className="flex-1 h-40 w-full text-lg p-4 border border-gray-300 rounded-md"
          rows={4}
        />
        <Button
          onClick={fetchCases}
          disabled={loading || !caseDescription.trim()}
          className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]"
        >
          {loading ? "Loading Cases..." : "Fetch Cases"}
        </Button>
      </div>

      {filteredCases.length > 0 ? (
        <div className="mt-4">
          {filteredCases.map((caseItem, index) => renderCaseDetails(caseItem, index))}
        </div>
      ) : (
        <p className="text-[#0A2E4D]">{loading ? "Fetching cases..." : "No cases available or matching search."}</p>
      )}
    </div>
  );
}
