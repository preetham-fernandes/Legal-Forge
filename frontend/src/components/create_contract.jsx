"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";

export default function CreateContract() {
  const [landlordName, setLandlordName] = useState("");
  const [landlordAddress, setLandlordAddress] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [propertyDetails, setPropertyDetails] = useState("");
  const [leaseTerm, setLeaseTerm] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
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

      const cleanContract = data.contract.replace(/\*/g, "");
      setGeneratedContract(cleanContract);

      const doc = new jsPDF();
      const lines = doc.splitTextToSize(cleanContract, 190);

      let y = 10;
      const lineHeight = 10;

      for (let i = 0; i < lines.length; i++) {
        if (y + lineHeight > doc.internal.pageSize.height) {
          doc.addPage();
          y = 10;
        }
        doc.text(lines[i], 10, y);
        y += lineHeight;
      }

      doc.save("contract.pdf");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#DBA865]">Create Contract</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="landlordName" className="block font-medium text-[#0A2E4D] mb-1">Landlord Name</label>
            <Input 
              id="landlordName" 
              value={landlordName} 
              onChange={(e) => setLandlordName(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="landlordAddress" className="block font-medium text-[#0A2E4D] mb-1">Landlord Address</label>
            <Input 
              id="landlordAddress" 
              value={landlordAddress} 
              onChange={(e) => setLandlordAddress(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="tenantName" className="block font-medium text-[#0A2E4D] mb-1">Tenant Name</label>
            <Input 
              id="tenantName" 
              value={tenantName} 
              onChange={(e) => setTenantName(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="tenantAddress" className="block font-medium text-[#0A2E4D] mb-1">Tenant Address</label>
            <Input 
              id="tenantAddress" 
              value={tenantAddress} 
              onChange={(e) => setTenantAddress(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="propertyDetails" className="block font-medium text-[#0A2E4D] mb-1">Property Details</label>
            <Input 
              id="propertyDetails" 
              value={propertyDetails} 
              onChange={(e) => setPropertyDetails(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="leaseTerm" className="block font-medium text-[#0A2E4D] mb-1">Lease Term (in years)</label>
            <Input 
              id="leaseTerm" 
              value={leaseTerm} 
              onChange={(e) => setLeaseTerm(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="securityDeposit" className="block font-medium text-[#0A2E4D] mb-1">Security Deposit (in rupees)</label>
            <Input 
              id="securityDeposit" 
              value={securityDeposit} 
              onChange={(e) => setSecurityDeposit(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="rentAmount" className="block font-medium text-[#0A2E4D] mb-1">Rent Amount (in rupees)</label>
            <Input 
              id="rentAmount" 
              value={rentAmount} 
              onChange={(e) => setRentAmount(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="paymentFrequency" className="block font-medium text-[#0A2E4D] mb-1">Payment Frequency (e.g., monthly, yearly)</label>
            <Input 
              id="paymentFrequency" 
              value={paymentFrequency} 
              onChange={(e) => setPaymentFrequency(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium text-[#0A2E4D] mb-1">Date</label>
            <Input 
              id="date" 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full border-[#DBA865] focus:ring-[#0A2E4D]"
            />
          </div>
        </div>
        <Button
          onClick={handleCreateContract}
          disabled={loading}
          className="w-full bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Contract...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Create Contract
            </>
          )}
        </Button>

        {generatedContract && (
          <Card className="mt-6 bg-[#0A2E4D] text-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#DBA865] flex justify-between items-center">
                Generated Contract
                <Button
                  onClick={() => {
                    const doc = new jsPDF();
                    doc.text(generatedContract, 10, 10);
                    doc.save("contract.pdf");
                  }}
                  className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border border-[#DBA865] p-4">
                <pre className="whitespace-pre-wrap">{generatedContract}</pre>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}