"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Not used, consider removing if not needed
import axios from "axios";
import { Textarea } from "./textarea"; // Ensure this component is implemented correctly

export default function GetCases() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [caseDescription, setCaseDescription] = useState(""); // State for the case description

  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_cases", {
        case_description: caseDescription, // Include the user-provided case description
      });
      const fetchedCases = response.data.cases || []; // Assuming the response has a 'cases' field with an array
      setCases(fetchedCases);
      setFilteredCases(fetchedCases); // Initially display all cases
    } catch (error) {
      console.error("Error fetching cases:", error);
      alert("Error fetching cases."); // Consider more informative error messages
    } finally {
      setLoading(false); // Ensure loading is reset regardless of success/failure
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = cases.filter(
      (caseItem) =>
        caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
        caseItem.client_information?.plaintiff.toLowerCase().includes(query.toLowerCase()) || // Adjust according to your data structure
        caseItem.client_information?.defendant.toLowerCase().includes(query.toLowerCase()) // Adjust according to your data structure
    );
    setFilteredCases(filtered);
  };

  const renderCaseDetails = (caseItem, index) => (
    <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="font-semibold text-lg mb-2 text-[#DBA865]">{caseItem.title}</h3>
      <p><strong>Plaintiff:</strong> {caseItem.client_information?.plaintiff || "N/A"}</p>
      <p><strong>Defendant:</strong> {caseItem.client_information?.defendant || "N/A"}</p>
      <p><strong>Status:</strong> {caseItem.status}</p>
      <p><strong>Description:</strong> {caseItem.description}</p>
    </div>
  );

  useEffect(() => {
    // Optionally, you can call fetchCases here if you want to fetch cases on mount
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Get Relevant Cases</h2>
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="Enter case description"
          value={caseDescription}
          onChange={(e) => setCaseDescription(e.target.value)}
          className="flex-1 h-40 w-full text-lg p-4 border border-gray-300 rounded-md" // Adjust height and add padding
          rows={4} // Set the number of rows for the textarea
        />
        <Button
          onClick={fetchCases}
          disabled={loading || !caseDescription} // Disable if loading or no description
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
