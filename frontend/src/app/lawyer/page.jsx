"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Gavel,
  FileText,
  Search,
  Users,
  DollarSign,
  BarChart,
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
  { name: "AI Legal Research", icon: BookOpen },
  { name: "Document Review", icon: FileCheck },
  { name: "Client Communication", icon: MessageCircle },
  { name: "Document Collaboration", icon: UsersIcon },
  { name: "AI Contract Review", icon: FileSignature },
  { name: "Profile Customization", icon: UserCircle },
]

export default function LawyerDashboard() {
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)

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
      case "AI Legal Research":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">AI-Assisted Legal Research</h2>
            <Textarea placeholder="Enter case details or research query..." />
            <Button>Conduct Research</Button>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Research Results</h3>
              <p>AI-powered insights and relevant cases will appear here.</p>
            </div>
          </div>
        )
      case "Document Review":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Document Review Tool</h2>
            <Input type="file" />
            <Button>Analyze Document</Button>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Analysis Results</h3>
              <p>AI-highlighted areas of concern will appear here.</p>
            </div>
          </div>
        )
      case "Client Communication":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Client Communication Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button>Start Chat</Button>
              <Button>Video Conference</Button>
              <Button>Send Message</Button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Recent Communications</h3>
              <p>List of recent client interactions will appear here.</p>
            </div>
          </div>
        )
      case "Document Collaboration":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Document Collaboration</h2>
            <Input placeholder="Enter document name or ID" />
            <Button>Open Collaborative Editor</Button>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Recent Collaborations</h3>
              <p>List of recent collaborative documents will appear here.</p>
            </div>
          </div>
        )
      case "AI Contract Review":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">AI-Assisted Contract Review</h2>
            <Input type="file" />
            <Button>Analyze Contract</Button>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Contract Analysis</h3>
              <p>AI-identified risks, clauses, and compliance issues will appear here.</p>
            </div>
          </div>
        )
      case "Profile Customization":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Profile Customization</h2>
            <Input placeholder="Areas of specialization" />
            <Input placeholder="Years of experience" />
            <Textarea placeholder="Bio" />
            <Button>Update Profile</Button>
          </div>
        )
      default:
        return (
            <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, Lawyer</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$15,231</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Assists</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73</div>
                  <p className="text-xs text-muted-foreground">+42% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {/* Add a list or table of recent activities here */}
            </div>
          </main>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleNav}>
          {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <Link className="flex items-center justify-center" href="/">
          <Gavel className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Legal Forge</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-gray-800 text-white w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <nav className="p-4 space-y-2">
            {features.map((feature) => (
              <Button
                key={feature.name}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-gray-700"
                onClick={() => selectFeature(feature.name)}
              >
                <feature.icon className="mr-2 h-4 w-4" />
                {feature.name}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          {renderFeatureContent()}
        </main>
      </div>
    </div>
  )
}