"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"
import { QrCode, Download, CheckCircle, Fingerprint, Shield, MapPin } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

export default function TrustPassport() {
  const [isMinted, setIsMinted] = useState(false)
  const { toast } = useToast()
  const { colors } = useMode()

  const handleMint = () => {
    setIsMinted(true)

    // Play success sound
    const audio = new Audio("/success.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    toast({
      title: "TrustPassport NFT Minted!",
      description: "Your digital identity is now secured on the blockchain",
      variant: "default",
    })
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
          <h2 className="text-3xl font-bold text-[#1E2022] mb-4">TrustPassport NFT</h2>
          <p className="text-lg text-[#1E2022]/70">Your digital identity secured on the blockchain</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <motion.div
              animate={
                isMinted
                  ? {
                      y: [0, -10, 0],
                      boxShadow: [
                        `0px 0px 0px ${colors.primary}00`,
                        `0px 10px 30px ${colors.primary}30`,
                        `0px 0px 0px ${colors.primary}00`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: isMinted ? Number.POSITIVE_INFINITY : 0, repeatType: "reverse" }}
              className="bg-white rounded-2xl p-6 border-2 relative overflow-hidden"
              style={{ borderColor: colors.primary }}
            >
              <div className="absolute top-0 right-0 m-4">
                <QrCode className="w-8 h-8" style={{ color: colors.primary }} />
              </div>

              <div className="flex items-center mb-6">
                <Shield className="w-10 h-10 mr-3" style={{ color: colors.primary }} />
                <div>
                  <h3 className="text-xl font-bold text-[#1E2022]">TrustPassport</h3>
                  <p className="text-sm text-[#1E2022]/70">Verified Digital Identity</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className="text-sm font-medium">Device Fingerprint</p>
                    <p className="text-xs text-[#1E2022]/70">{isMinted ? "f8a2e9c7b3d1..." : "••••••••••••"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center" style={{ color: colors.primary }}>
                    🆔
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aadhaar Hash</p>
                    <p className="text-xs text-[#1E2022]/70">{isMinted ? "0xd4c3b2a1..." : "••••••••••••"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                  <div>
                    <p className="text-sm font-medium">Location Hash</p>
                    <p className="text-xs text-[#1E2022]/70">{isMinted ? "0x7e6d5c4b..." : "••••••••••••"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-[#1E2022]/70">{isMinted ? "Minted: 07 May 2024" : "Not minted yet"}</div>
                {isMinted && (
                  <div className="flex items-center text-xs" style={{ color: colors.primary }}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>

              {isMinted && (
                <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10">
                  <Shield className="w-full h-full" style={{ color: colors.primary }} />
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#1E2022]">
              {isMinted ? "Your TrustPassport is Ready!" : "Secure Your Digital Identity"}
            </h3>

            <p className="text-[#1E2022]/70">
              {isMinted
                ? "Your digital identity is now secured on the blockchain. Use your TrustPassport for secure transactions across platforms."
                : "The TrustPassport NFT combines your device fingerprint, biometrics, and location data into a secure, verifiable digital identity."}
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4" style={{ color: colors.primary }} />
                <span>Tamper-proof digital identity</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4" style={{ color: colors.primary }} />
                <span>Verified by Agnisethu Smart Contract</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4" style={{ color: colors.primary }} />
                <span>Works across all trusted platforms</span>
              </div>
            </div>

            {isMinted ? (
              <button
                className="flex items-center justify-center w-full py-3 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download TrustPassport
              </button>
            ) : (
              <button
                onClick={handleMint}
                className="w-full py-3 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Mint Your TrustPassport
              </button>
            )}

            <p className="text-xs text-center text-[#1E2022]/50">
              Verified by Agnisethu Smart Contract on AgnisethuChain
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
