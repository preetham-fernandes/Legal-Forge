import Link from "next/link"
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gavel, FileText, Search, Users, ArrowRight, CheckCircle } from "lucide-react"
import Logo from '@/assets/logo.png';
import bgImage from '@/assets/hero-section.png';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-16 flex items-center bg-transparent text-white z-10">
        {/* Logo Section */}
        <Link className="flex items-center justify-center" href="/">
          {/* Logo Image */}
          <Image src={Logo} alt="Legal Forge Logo" className="h-[6vh] w-[30vh]" />
        </Link>

        {/* Nav Section */}
        <nav className="ml-auto flex gap-4 mt-2 sm:gap-6">
          {/* Login Button */}
          <Link href="/login">
            <Button variant="ghost" size="xl">
              Login
            </Button>
          </Link>

          {/* Signup Button */}
          <Link href="/signup">
            <Button variant="ghost" size="xl">
              Signup
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="hero w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-blue-200 bg-cover bg-center" 
  style={{ backgroundImage: `url(${bgImage.src})` }}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col h-[40vh] items-center space-y-4 text-center">
              <div className="space-y-2 mt-16">
                <h1 className="text-3xl font-bold tracking-tighter p-4 sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-white">
                  Revolutionizing Legal Services with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Legal Forge simplifies legal consultation, document drafting, and research using advanced AI. Connect
                  with top legal professionals effortlessly.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-[#bb8f56] hover:bg-[#e2ac66]">Get Started</Button>
                {/* <Button size="lg" variant="outline">Learn More</Button> */}
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg transition-all hover:shadow-xl">
                <FileText className="h-12 w-12 text-[#dba865] mb-4" />
                <h3 className="text-xl font-bold mb-2">AI-Powered Document Drafting</h3>
                <p className="text-gray-600">Generate legal documents with the help of advanced AI technology.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg transition-all hover:shadow-xl">
                <Search className="h-12 w-12 text-[#dba865] mb-4" />
                <h3 className="text-xl font-bold mb-2">Intelligent Legal Research</h3>
                <p className="text-gray-600">Access comprehensive legal information quickly and efficiently.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg transition-all hover:shadow-xl">
                <Users className="h-12 w-12 text-[#dba865] mb-4" />
                <h3 className="text-xl font-bold mb-2">Lawyer-Client Marketplace</h3>
                <p className="text-gray-600">Connect with experienced legal professionals for personalized advice.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-lg transition-all hover:shadow-xl">
                <Gavel className="h-12 w-12 text-[#dba865] mb-4" />
                <h3 className="text-xl font-bold mb-2">Simplified Consultation</h3>
                <p className="text-gray-600">Get quick answers to your legal questions through our AI assistant.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#dba865] text-white flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Describe Your Needs</h3>
                <p className="text-gray-600">Tell us about your legal requirements or questions.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#dba865] text-white flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600">Our AI analyzes your input and provides initial guidance or drafts.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#dba865] text-white flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Review (Optional)</h3>
                <p className="text-gray-600">Connect with a lawyer for personalized advice if needed.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#dba865] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Simplify Your Legal Processes?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join Legal Forge today and experience the future of legal services.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white text-black" placeholder="Enter your email" type="email" />
                  <Button type="submit" variant="secondary">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-blue-100">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500">© 2024 Legal Forge. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
