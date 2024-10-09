"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ContractReview from "@/components/contract_review";
import CreateContract from "@/components/create_contract"
import GetCases from "@/components/get_cases" 
import Logo from "@/assets/logo.png";
import {
  Gavel,
  FileText,
  Search,
  Users,
  DollarSign,
  BarChart,
  Bot,
  Menu,
  X,
  BookOpen,
  FileCheck,
  MessageCircle,
  Users as UsersIcon,
  FileSignature,
  UserCircle
} from "lucide-react"

const features = [
  { name: "My Clients", icon: MessageCircle },
  { name: "Document Drafting", icon: FileSignature },
  { name: "Contract Review", icon: FileText }, 
  { name: "Search Cases", icon: BookOpen },
  { name: "Profile Customization", icon: UserCircle },
]

export default function LawyerDashboard() {
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const handleLogout = () => {
    router.push('/')
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const selectFeature = (feature) => {
    setSelectedFeature(feature)
    if (window.innerWidth < 768) {
      setIsNavOpen(false)
    }
  }

  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case "Contract Review":
        return <ContractReview />;
      case "My Clients":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#DBA865]">Client Communication Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]">Start Chat</Button>
              <Button className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]">Video Conference</Button>
              <Button className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]">Send Message</Button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#DBA865]">Recent Communications</h3>
              <p className="text-[#000000]">List of recent client interactions will appear here.</p>
            </div>
          </div>
        )
      case "Document Drafting":
        if (selectedDocument === "contract") {
          return <CreateContract />
        }
        return (
          <CreateContract />
        )
        case "Search Cases":
         return <GetCases />;
      case "Profile Customization":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#DBA865]">Profile Customization</h2>
            <Input placeholder="Areas of expertise" className="bg-white text-[#0A2E4D]" />
            <Input placeholder="Years of experience" className="bg-white text-[#0A2E4D]" />
            <Input placeholder="Address" className="bg-white text-[#0A2E4D]" />
            <Input placeholder="Office" className="bg-white text-[#0A2E4D]" />
            <Textarea placeholder="About Me" className="bg-white text-[#0A2E4D]" />
            <Button className="bg-[#DBA865] text-[#0A2E4D] hover:bg-[#c99b5a]">Update Profile</Button>
          </div>
        )
      default:
        return (
          <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#DBA865]">Welcome, Lawyer</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-[#0A2E4D] text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
                  <FileText className="h-4 w-4 text-[#DBA865]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-[#DBA865]">+2 from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A2E4D] text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Users className="h-4 w-4 text-[#DBA865]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-[#DBA865]">+3 new this month</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A2E4D] text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-[#DBA865]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$15,231</div>
                  <p className="text-xs text-[#DBA865]">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0A2E4D] text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Assists</CardTitle>
                  <BarChart className="h-4 w-4 text-[#DBA865]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73</div>
                  <p className="text-xs text-[#DBA865]">+42% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-[#DBA865]">Recent Activity</h2>
              <div className="bg-[#0A2E4D] text-white p-4 rounded-lg">
                <p>Recent activity details will be displayed here.</p>
              </div>
            </div>
          </main>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A2E4D]">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#DBA865] bg-[#0A2E4D]">
        <Button variant="ghost" size="icon" className="md:hidden text-[#DBA865]" onClick={toggleNav}>
          {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <Link className="flex items-center justify-center" href="/">
          {/* Logo Image */}
          <Image
            src={Logo}
            alt="Legal Forge Logo"
            className="h-[6vh] w-[30vh]"
          />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="border-[#DBA865] text-[#DBA865] hover:bg-[#DBA865] hover:text-[#0A2E4D]"
          >
            Logout
          </Button>
        </nav>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-[#0A2E4D] text-white w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 border-r border-[#DBA865]`}
        >
          <nav className="p-4 space-y-2">
            {features.map((feature) => (
              <Button
                key={feature.name}
                variant="ghost"
                className="w-full justify-start text-[#DBA865] hover:bg-[#DBA865] hover:text-[#0A2E4D]"
                onClick={() => selectFeature(feature.name)}
              >
                <feature.icon className="mr-2 h-4 w-4" />
                {feature.name}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          {renderFeatureContent()}
        </main>
      </div>
    </div>
  )
}