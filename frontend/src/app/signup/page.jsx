'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Users } from "lucide-react"
import Logo from '@/assets/logo.png'
import { auth, db, createUserWithEmailAndPassword } from '@/lib/firebase'; // Adjust path as needed
import { doc, setDoc } from 'firebase/firestore'; // Import these functions


export default function SignupPage() {
  const [userType, setUserType] = useState(null)
  const [showSignupFields, setShowSignupFields] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    barCouncilNo: ''
  })
  const router = useRouter()

  const handleUserTypeSelect = (type) => {
    setUserType(type)
    setShowSignupFields(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        userType: userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        email: formData.email,
        barCouncilNo: userType === "lawyer" ? formData.barCouncilNo : null,
        password: formData.password // Store password for use in login
      })

      // Redirect based on user type
      router.push(`/${userType}`)
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A2E4D]">
      <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-16 flex items-center bg-transparent text-white z-10">
        {/* Logo Section */}
        <Link className="flex items-center justify-center" href="/">
          {/* Logo Image */}
          <Image
            src={Logo}
            alt="Legal Forge Logo"
            className="h-[6vh] w-[30vh]"
          />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center text-[#dba865]">
        <div className="w-full max-w-md p-8 bg-[#0D3B63] backdrop-blur-md rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#dba865]">Sign Up to Legal Forge</h1>
          {!showSignupFields ? (
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className="bg-[#114B7D] border-[#1E6AAF] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-[#1E6AAF]" 
                onClick={() => handleUserTypeSelect('lawyer')}
              >
                <CardHeader>
                  <CardTitle className="text-center text-[#dba865]">Lawyer</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Scale size={48} className="text-[#dba865] transition-all duration-300 ease-in-out group-hover:scale-110" />
                </CardContent>
              </Card>
              <Card 
                className="bg-[#114B7D] border-[#1E6AAF] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-[#1E6AAF]" 
                onClick={() => handleUserTypeSelect('client')}
              >
                <CardHeader>
                  <CardTitle className="text-center text-[#dba865]">Client</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Users size={48} className="text-[#dba865] transition-all duration-300 ease-in-out group-hover:scale-110" />
                </CardContent>
              </Card>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {userType === "lawyer" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#dba865]">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#dba865]">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-[#dba865]">Mobile No</Label>
                    <Input id="mobile" type="tel" placeholder="Enter your mobile number" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barCouncilNo" className="text-[#dba865]">Bar Council No.</Label>
                    <Input id="barCouncilNo" placeholder="Enter your bar council number" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#dba865]">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#dba865]">Set Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                </>
              )}
              {userType === "client" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#dba865]">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#dba865]">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-[#dba865]">Mobile No</Label>
                    <Input id="mobile" type="tel" placeholder="Enter your mobile number" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#dba865]">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#dba865]">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]" onChange={handleChange} />
                  </div>
                </>
              )}
              <Button type="submit" className="w-full bg-[#1E6AAF] text-[#dba865] hover:bg-[#2980D3] transition-colors duration-300">
                Sign Up
              </Button>
            </form>
          )}
          <p className="mt-4 text-center text-sm text-[#8AB4D8]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#dba865] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
