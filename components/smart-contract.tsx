"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, ShoppingCart, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SmartContract() {
  const [verificationState, setVerificationState] = useState<"idle" | "verifying" | "approved" | "rejected">("idle")
  const { toast } = useToast()

  const handleVerifyGood = () => {
    setVerificationState("verifying")

    setTimeout(() => {
      setVerificationState("approved")

      // Play success sound
      const audio = new Audio("/success.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))

      toast({
        title: "TrustScore = 91",
        description: "Order Confirmed ✅",
        variant: "default",
      })
    }, 2000)
  }

  const handleVerifyBad = () => {
    setVerificationState("verifying")

    setTimeout(() => {
      setVerificationState("rejected")

      // Play alert sound
      const audio = new Audio("/alert.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))

      toast({
        title: "TrustScore = 40",
        description: "Access Denied – Suspicious Profile ⚠️",
        variant: "destructive",
      })
    }, 2000)
  }

  return (
    <section className="w-full py-16 px-4 bg-[#F1F3F4]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1E2022] mb-4">Smart Contract Simulation</h2>
          <p className="text-lg text-[#1E2022]/70">See how TrustPassport verifies users across platforms</p>
        </motion.div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-[#F1F3F4] pb-4">
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 text-[#008080] mr-3" />
              <h3 className="text-xl font-semibold text-[#1E2022]">TrustMart Checkout</h3>
            </div>
            <div className="flex items-center text-sm text-[#1E2022]/70">
              <Shield className="w-4 h-4 mr-1" />
              Secured by Agnisethu
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-[#F1F3F4] rounded-xl p-4 mb-6">
                <h4 className="font-medium mb-2">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Premium Smartphone</span>
                    <span>₹49,999</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Watch</span>
                    <span>₹24,999</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wireless Earbuds</span>
                    <span>₹9,999</span>
                  </div>
                  <div className="border-t border-[#1E2022]/10 pt-2 mt-2 font-medium flex justify-between">
                    <span>Total</span>
                    <span>₹84,997</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#008080] flex items-center justify-center text-white text-xs mt-1">
                    1
                  </div>
                  <div>
                    <p className="font-medium">High-Value Transaction</p>
                    <p className="text-sm text-[#1E2022]/70">
                      Purchases over ₹50,000 require TrustPassport verification
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#008080] flex items-center justify-center text-white text-xs mt-1">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Smart Contract Check</p>
                    <p className="text-sm text-[#1E2022]/70">
                      Agnisethu verifies your TrustPassport against fraud patterns
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#008080] flex items-center justify-center text-white text-xs mt-1">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Instant Decision</p>
                    <p className="text-sm text-[#1E2022]/70">
                      Transaction is approved or rejected based on your TrustScore
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="bg-[#F1F3F4] rounded-xl p-6 mb-6 flex-grow">
                <h4 className="font-medium mb-4">TrustPassport Verification</h4>

                <div className="flex justify-center mb-6">
                  {verificationState === "idle" && <Shield className="w-16 h-16 text-[#008080]/50" />}

                  {verificationState === "verifying" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Shield className="w-16 h-16 text-[#008080]" />
                    </motion.div>
                  )}

                  {verificationState === "approved" && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircle className="w-16 h-16 text-[#90E0EF]" />
                    </motion.div>
                  )}

                  {verificationState === "rejected" && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1, x: [0, 10, -10, 10, -10, 0] }}
                      transition={{
                        scale: { type: "spring", stiffness: 200, damping: 10 },
                        x: { duration: 0.5 },
                      }}
                    >
                      <XCircle className="w-16 h-16 text-[#FF5F5D]" />
                    </motion.div>
                  )}
                </div>

                <div className="text-center mb-6">
                  {verificationState === "idle" && <p className="text-[#1E2022]/70">Ready to verify your identity</p>}

                  {verificationState === "verifying" && <p className="text-[#008080]">Verifying TrustPassport...</p>}

                  {verificationState === "approved" && (
                    <div>
                      <p className="text-[#90E0EF] font-medium">TrustScore: 91</p>
                      <p className="text-[#1E2022]/70">Transaction Approved</p>
                    </div>
                  )}

                  {verificationState === "rejected" && (
                    <div>
                      <p className="text-[#FF5F5D] font-medium">TrustScore: 40</p>
                      <p className="text-[#1E2022]/70">Suspicious Activity Detected</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleVerifyGood}
                  disabled={verificationState !== "idle"}
                  className={`py-3 ${
                    verificationState !== "idle"
                      ? "bg-[#1E2022]/20 cursor-not-allowed"
                      : "bg-[#6C63FF] hover:bg-[#5A52E0]"
                  } text-white rounded-xl font-medium transition-colors`}
                >
                  Simulate Good User
                </button>

                <button
                  onClick={handleVerifyBad}
                  disabled={verificationState !== "idle"}
                  className={`py-3 ${
                    verificationState !== "idle"
                      ? "bg-[#1E2022]/20 cursor-not-allowed"
                      : "bg-[#FF5F5D] hover:bg-[#FF4D4B]"
                  } text-white rounded-xl font-medium transition-colors`}
                >
                  Simulate Fraudster
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
