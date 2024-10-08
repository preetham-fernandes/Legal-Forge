"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import Firebase authentication
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Users } from "lucide-react";
import Logo from "@/assets/logo.png";

export default function LoginPage() {
  const [userType, setUserType] = useState(null); // Determine if user is a lawyer or client
  const [showLoginFields, setShowLoginFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle user type selection (lawyer or client)
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setShowLoginFields(true);
  };

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Redirect based on user type
      if (userType === "lawyer") {
        router.push("/lawyer");
      } else if (userType === "client") {
        router.push("/client");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A2E4D]">
      <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-16 flex items-center bg-transparent text-white z-10">
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
          <h1 className="text-2xl font-bold text-center mb-6 text-[#dba865]">
            Login to Legal Forge
          </h1>

          {!showLoginFields ? (
            // Show selection between lawyer or client
            <div className="grid grid-cols-2 gap-4">
              <Card
                className="bg-[#114B7D] border-[#1E6AAF] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-[#1E6AAF]"
                onClick={() => handleUserTypeSelect("lawyer")}
              >
                <CardHeader>
                  <CardTitle className="text-center text-[#dba865]">
                    Lawyer
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Scale
                    size={48}
                    className="text-[#dba865] transition-all duration-300 ease-in-out group-hover:scale-110"
                  />
                </CardContent>
              </Card>
              <Card
                className="bg-[#114B7D] border-[#1E6AAF] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-[#1E6AAF]"
                onClick={() => handleUserTypeSelect("client")}
              >
                <CardHeader>
                  <CardTitle className="text-center text-[#dba865]">
                    Client
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Users
                    size={48}
                    className="text-[#dba865] transition-all duration-300 ease-in-out group-hover:scale-110"
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            // Show login form after selecting lawyer or client
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#dba865]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#dba865]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="bg-[#114B7D] text-[#dba865] border-[#1E6AAF] placeholder-[#8AB4D8]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#1E6AAF] text-[#dba865] hover:bg-[#2980D3] transition-colors duration-300"
              >
                Login
              </Button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-[#8AB4D8]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#dba865] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
