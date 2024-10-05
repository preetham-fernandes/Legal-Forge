"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Gavel } from "lucide-react"

export default function LoginPage() {
  const [userType, setUserType] = useState(null)
  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically handle the login logic
    // For this example, we'll just redirect to the appropriate dashboard
    if (userType === "lawyer") {
      router.push("/lawyer")
    } else if (userType === "client") {
      router.push("/client")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link className="flex items-center justify-center" href="/">
          <Gavel className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">Legal Forge</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Login to Legal Forge</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup value={userType || ""} onValueChange={(value) => setUserType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lawyer" id="lawyer" />
                <Label htmlFor="lawyer">I am a Lawyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client">I am a Client</Label>
              </div>
            </RadioGroup>
            {userType === "lawyer" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bar-number">Bar Number</Label>
                  <Input id="bar-number" placeholder="Enter your bar number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lawyer-email">Email</Label>
                  <Input id="lawyer-email" type="email" placeholder="Enter your email" required />
                </div>
              </>
            )}
            {userType === "client" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input id="client-email" type="email" placeholder="Enter your email" required />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-center text-gray-500">© 2024 Legal Forge. All rights reserved.</p>
      </footer>
    </div>
  )
}