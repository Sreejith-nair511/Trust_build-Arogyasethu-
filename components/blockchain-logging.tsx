"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BlockchainLogging() {
  const [isLogged, setIsLogged] = useState(false)
  const { toast } = useToast()

  const handleLogFraud = () => {
    setIsLogged(true)

    // Play alert sound
    const audio = new Audio("/alert.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    toast({
      title: "Fraud Alert Recorded",
      description: "Transaction frozen on AgnisethuChain",
      variant: "destructive",
    })
  }

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#1E2022] mb-4">Blockchain Logging</h2>
          <p className="text-lg text-[#1E2022]/70">Immutable record of fraud detection on AgnisethuChain</p>
        </motion.div>

        <div className="bg-[#F1F3F4] rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-xl font-semibold text-[#1E2022] mb-4">Fraud Alert System</h3>
              <p className="text-[#1E2022]/70 mb-6">
                When fraud is detected, Agnisethu automatically logs the incident on the blockchain and freezes
                suspicious transactions.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-[#FF5F5D] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Immediate Response</p>
                    <p className="text-sm text-[#1E2022]/70">
                      Suspicious activities trigger automatic protection measures
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <LinkIcon className="w-5 h-5 text-[#008080] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Immutable Records</p>
                    <p className="text-sm text-[#1E2022]/70">
                      All fraud alerts are permanently recorded on AgnisethuChain
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#008080] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Asset Protection</p>
                    <p className="text-sm text-[#1E2022]/70">Automatic freezing of funds prevents financial loss</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogFraud}
                disabled={isLogged}
                className={`w-full py-3 ${isLogged ? "bg-[#1E2022]/20 cursor-not-allowed" : "bg-[#6C63FF] hover:bg-[#5A52E0]"} text-white rounded-xl font-medium transition-colors`}
              >
                {isLogged ? "Fraud Alert Logged" : "Simulate Fraud Detection"}
              </button>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="bg-[#1E2022] rounded-xl p-4 font-mono text-sm text-white/90 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#008080]">AgnisethuChain Explorer</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs">Connected</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {isLogged ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="border border-[#008080]/30 rounded p-2"
                      >
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>BLOCK #4327</span>
                          <span>{new Date().toISOString().split("T")[0]}</span>
                        </div>
                        <div className="text-[#FF5F5D] mb-1">⚖️ Fraud Alert #4327 Recorded</div>
                        <div className="text-xs mb-1">⛓️ Wallet Impact: ₹12,300 Frozen</div>
                        <div className="text-xs text-white/60">Hash: 0x7a3b2c1d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="border border-white/10 rounded p-2"
                      >
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>BLOCK #4326</span>
                          <span>{new Date().toISOString().split("T")[0]}</span>
                        </div>
                        <div className="text-white/80 mb-1">✅ Transaction Verified</div>
                        <div className="text-xs text-white/60">Hash: 0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="border border-white/10 rounded p-2"
                      >
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>BLOCK #4325</span>
                          <span>{new Date().toISOString().split("T")[0]}</span>
                        </div>
                        <div className="text-white/80 mb-1">✅ Transaction Verified</div>
                        <div className="text-xs text-white/60">Hash: 0x2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t</div>
                      </motion.div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-white/40">No recent blockchain events</div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
