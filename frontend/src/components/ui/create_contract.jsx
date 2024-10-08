"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";

export default function CreateContract() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddress, setLandlordAddress] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [propertyDetails, setPropertyDetails] = useState("");
  const [leaseTerm, setLeaseTerm] = useState(""); // Term of lease
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState(""); // Frequency of rent payments
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState("");

  const handleCreateContract = async () => {
    if (!landlordName || !landlordAddress || !tenantName || !tenantAddress || !propertyDetails || !leaseTerm || !securityDeposit || !rentAmount || !paymentFrequency || !date) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const contractDetails = {
        landlord_name: landlordName,
        landlord_address: landlordAddress,
        tenant_name: tenantName,
        tenant_address: tenantAddress,
        property_details: propertyDetails,
        lease_term: leaseTerm,
        security_deposit: securityDeposit,
        rent_amount: rentAmount,
        payment_frequency: paymentFrequency,
        date: date,
      };

      // Send the details to the backend to generate the contract
      const response = await fetch("http://localhost:5000/create_contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to generate contract");
      }

      const data = await response.json();

      //if (!data.contract) {
        //throw new Error("No contract data received");
      //}

      const cleanContract = data.contract.replace(/\*/g, ""); // Remove asterisks if needed
      setGeneratedContract(cleanContract);

      // Generate and download the PDF
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(cleanContract, 190); // Adjust width as necessary

      let y = 10; // Starting y position
      const lineHeight = 10; // Space between lines

      for (let i = 0; i < lines.length; i++) {
        if (y + lineHeight > doc.internal.pageSize.height) {
          doc.addPage(); // Add a new page
          y = 10; // Reset y position
        }
        doc.text(lines[i], 10, y); // Write the line
        y += lineHeight; // Move y position down for the next line
      }

      doc.save("contract.pdf");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Contract</h2>
      <div>
        <label htmlFor="landlordName" className="block font-medium">Landlord Name</label>
        <Input 
          id="landlordName" 
          value={landlordName} 
          onChange={(e) => setLandlordName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="landlordAddress" className="block font-medium">Landlord Address</label>
        <Input 
          id="landlordAddress" 
          value={landlordAddress} 
          onChange={(e) => setLandlordAddress(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="tenantName" className="block font-medium">Tenant Name</label>
        <Input 
          id="tenantName" 
          value={tenantName} 
          onChange={(e) => setTenantName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="tenantAddress" className="block font-medium">Tenant Address</label>
        <Input 
          id="tenantAddress" 
          value={tenantAddress} 
          onChange={(e) => setTenantAddress(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="propertyDetails" className="block font-medium">Property Details</label>
        <Input 
          id="propertyDetails" 
          value={propertyDetails} 
          onChange={(e) => setPropertyDetails(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="leaseTerm" className="block font-medium">Lease Term (in years)</label>
        <Input 
          id="leaseTerm" 
          value={leaseTerm} 
          onChange={(e) => setLeaseTerm(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="securityDeposit" className="block font-medium">Security Deposit (in rupees)</label>
        <Input 
          id="securityDeposit" 
          value={securityDeposit} 
          onChange={(e) => setSecurityDeposit(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="rentAmount" className="block font-medium">Rent Amount (in rupees)</label>
        <Input 
          id="rentAmount" 
          value={rentAmount} 
          onChange={(e) => setRentAmount(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="paymentFrequency" className="block font-medium">Payment Frequency (e.g., monthly, yearly)</label>
        <Input 
          id="paymentFrequency" 
          value={paymentFrequency} 
          onChange={(e) => setPaymentFrequency(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="date" className="block font-medium">Date</label>
        <Input 
          id="date" 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
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
