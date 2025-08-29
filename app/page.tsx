"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { ChevronDown, Lock, User, FileText, LinkIcon, Shield } from "lucide-react"
import dynamic from "next/dynamic";
const TrustGraph = dynamic(() => import("./components/trust-graph"), { ssr: false });
import LoginSimulation from "./components/login-simulation"
import TrustPassport from "./components/trust-passport"
import BlockchainLogging from "./components/blockchain-logging"
import SmartContractSimulation from "./components/smart-contract-simulation"
import ModeSwitcher from "@/components/mode-switcher"
import { useMode } from "@/contexts/mode-context"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [showConfetti, setShowConfetti] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { colors } = useMode()

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/alert-beep.mp3")

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }, [showConfetti])

  const playAlertSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F3F4]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 mb-4"
        >
          <div className={`w-16 h-16 rounded-full border-4 border-${colors.border} border-t-transparent`}></div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-[#1E2022]"
        >
          अग्निसेतु 🔥
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[#1E2022] mt-2"
        >
          India's Firewall of Trust
        </motion.p>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F1F3F4] text-[#1E2022]">
      {/* Mode Selector - Fixed at the top right */}
      <div className="fixed top-4 right-4 z-50">
        <ModeSwitcher />
      </div>

      {/* Hero Section */}
      <section id="hero" className="w-full min-h-screen flex flex-col items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className={`inline-block p-2 rounded-full bg-${colors.secondary} mb-4`}>
            <Shield size={40} className={colors.text} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E2022] mb-4">अग्निसेतु 🔥</h1>
          <h2 className={`text-xl md:text-2xl mb-6 ${colors.text} font-semibold`}>India's Firewall of Trust</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className={`text-sm bg-${colors.secondary} px-3 py-1 rounded-full`}>அக்னிசேது – நம்பிக்கையின் பாலம்</span>
            <span className={`text-sm bg-${colors.secondary} px-3 py-1 rounded-full`}>अग्निसेतु - विश्वास का फायरवॉल</span>
            <span className={`text-sm bg-${colors.secondary} px-3 py-1 rounded-full`}>അഗ്നിസേതു - വിശ്വാസത്തിന്റെ ഫയർവാൾ</span>
          </div>
          <p className="text-lg mb-8 max-w-md mx-auto">
            A futuristic Indian solution against digital scams using AI, behavioral biometrics, graph networks, and
            blockchain.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${colors.button} text-white px-6 py-3 rounded-xl font-medium shadow-lg`}
            onClick={() => scrollToSection("features")}
          >
            Explore Features
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 w-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            onClick={() => scrollToSection("features")}
            className="cursor-pointer"
          >
            <ChevronDown size={32} className={colors.text} />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Navigation */}
      <section id="features" className="w-full py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Agnisethu Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "login", name: "Login Flow", icon: <User size={24} /> },
              { id: "passport", name: "TrustPassport", icon: <FileText size={24} /> },
              { id: "blockchain", name: "Blockchain", icon: <LinkIcon size={24} /> },
              { id: "contract", name: "Smart Contract", icon: <Lock size={24} /> },
            ].map((feature) => (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl cursor-pointer text-center ${
                  activeSection === feature.id ? colors.button + " text-white" : "bg-[#F1F3F4] text-[#1E2022]"
                }`}
                onClick={() => scrollToSection(feature.id)}
              >
                <div className="flex flex-col items-center">
                  {feature.icon}
                  <span className="mt-2 text-sm md:text-base">{feature.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Flow Simulation */}
      <section id="login" className="w-full py-12 px-4">
        <div className="container mx-auto max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Login Flow Simulation</h2>
          <LoginSimulation playAlertSound={playAlertSound} />
        </div>
      </section>

      {/* TrustPassport NFT */}
      <section id="passport" className="w-full py-12 px-4 bg-white">
        <div className="container mx-auto max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">TrustPassport NFT</h2>
          <TrustPassport triggerConfetti={triggerConfetti} />
        </div>
      </section>

      {/* Blockchain Logging */}
      <section id="blockchain" className="w-full py-12 px-4">
        <div className="container mx-auto max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Blockchain Logging</h2>
          <BlockchainLogging />
        </div>
      </section>

      {/* Smart Contract Simulation */}
      <section id="contract" className="w-full py-12 px-4 bg-white">
        <div className="container mx-auto max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Smart Contract Simulation</h2>
          <SmartContractSimulation />
        </div>
      </section>

      {/* Trust Graph View */}
      <section id="graph" className="w-full py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Trust Graph View</h2>
          <TrustGraph />
        </div>
      </section>

      {/* External Links */}
      <section id="links" className="w-full py-12 px-4 bg-white">
        <div className="container mx-auto max-w-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Projects</h2>
          <div className="flex flex-col gap-4">
            {[
              { name: "SAP FraudVault", url: "https://sap-fraudvault.vercel.app" },
              { name: "SAP Fingerpoint", url: "https://sap-fingerpont.vercel.app/" },
              { name: "TrustForge Protocol", url: "https://trustforge-protocol.vercel.app/" },
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#F1F3F4] p-4 rounded-xl flex items-center justify-between"
              >
                <span className="font-medium">{link.name}</span>
                <LinkIcon size={18} className={colors.text} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <p className="text-[#1E2022]">Made by kdebugger 🛡️</p>
        </motion.div>
      </footer>
    </main>
  )
}
