"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Shield, AlertTriangle, CheckCircle, Smartphone, Fingerprint, MapPin, Clock } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

export default function Features() {
  const [loginState, setLoginState] = useState<"normal" | "fraud" | null>(null)
  const { toast } = useToast()
  const { colors, mode } = useMode()

  const handleNormalLogin = () => {
    setLoginState("normal")

    setTimeout(() => {
      toast({
        title: "Trust Score: 92",
        description: "All Clear ✅",
        variant: "default",
      })

      // Play success sound
      const audio = new Audio("/success.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }, 1500)
  }

  const handleFraudLogin = () => {
    setLoginState("fraud")

    setTimeout(() => {
      toast({
        title: "Trust Score: 36",
        description: "Suspicious Pattern Detected ⚠️",
        variant: "destructive",
      })

      // Play alert sound
      const audio = new Audio("/alert.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }, 1500)
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
          <h2 className="text-3xl font-bold text-[#1E2022] mb-4">Login Flow Simulation</h2>
          <p className="text-lg text-[#1E2022]/70">Experience how Agnisethu detects fraudulent behavior in real-time</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#F1F3F4] rounded-2xl p-6 relative overflow-hidden"
          >
            <h3 className="text-xl font-semibold text-[#1E2022] mb-4">Normal User Flow</h3>
            <p className="text-[#1E2022]/70 mb-6">UPI + Aadhaar + face scan + natural typing pattern</p>

            <div className="flex flex-col space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5" style={{ color: colors.primary }} />
                <span>Regular device</span>
              </div>
              <div className="flex items-center space-x-3">
                <Fingerprint className="w-5 h-5" style={{ color: colors.primary }} />
                <span>Verified biometrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                <span>Known location</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                <span>Natural typing speed</span>
              </div>
            </div>

            <motion.div
              animate={
                loginState === "normal"
                  ? {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0px 0px 0px rgba(144,224,239,0)",
                        "0px 0px 20px rgba(144,224,239,0.7)",
                        "0px 0px 0px rgba(144,224,239,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: loginState === "normal" ? Number.POSITIVE_INFINITY : 0 }}
              className="flex items-center justify-center p-4 bg-white rounded-xl mb-6"
            >
              {loginState === "normal" ? (
                <CheckCircle className="w-12 h-12" style={{ color: colors.secondary }} />
              ) : (
                <Shield className="w-12 h-12" style={{ color: `${colors.primary}50` }} />
              )}
            </motion.div>

            <button
              onClick={handleNormalLogin}
              className="w-full py-3 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: colors.primary }}
            >
              Simulate Normal Login
            </button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#F1F3F4] rounded-2xl p-6 relative overflow-hidden"
          >
            <h3 className="text-xl font-semibold text-[#1E2022] mb-4">Fraudster Flow</h3>
            <p className="text-[#1E2022]/70 mb-6">New SIM, odd typing speed, reused PAN</p>

            <div className="flex flex-col space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-[#FF5F5D]" />
                <span>New device</span>
              </div>
              <div className="flex items-center space-x-3">
                <Fingerprint className="w-5 h-5 text-[#FF5F5D]" />
                <span>Unverified biometrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#FF5F5D]" />
                <span>Unusual location</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#FF5F5D]" />
                <span>Suspicious typing pattern</span>
              </div>
            </div>

            <motion.div
              animate={
                loginState === "fraud"
                  ? {
                      x: [-5, 5, -5, 5, 0],
                      boxShadow: [
                        "0px 0px 0px rgba(255,95,93,0)",
                        "0px 0px 20px rgba(255,95,93,0.7)",
                        "0px 0px 0px rgba(255,95,93,0)",
                      ],
                    }
                  : {}
              }
              transition={{
                x: { duration: 0.4, repeat: loginState === "fraud" ? 2 : 0 },
                boxShadow: { duration: 2, repeat: loginState === "fraud" ? Number.POSITIVE_INFINITY : 0 },
              }}
              className="flex items-center justify-center p-4 bg-white rounded-xl mb-6"
            >
              {loginState === "fraud" ? (
                <AlertTriangle className="w-12 h-12 text-[#FF5F5D]" />
              ) : (
                <Shield className="w-12 h-12" style={{ color: `${colors.primary}50` }} />
              )}
            </motion.div>

            <button
              onClick={handleFraudLogin}
              className="w-full py-3 text-white rounded-xl font-medium hover:opacity-90 transition-colors"
              style={{ backgroundColor: mode === "emergency" ? colors.primary : "#FF5F5D" }}
            >
              Simulate Fraud Login
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
