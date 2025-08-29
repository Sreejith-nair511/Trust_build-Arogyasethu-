"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Shield, AlertTriangle, Fingerprint, MapPin } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

interface LoginSimulationProps {
  playAlertSound: () => void
}

export default function LoginSimulation({ playAlertSound }: LoginSimulationProps) {
  const [activeTab, setActiveTab] = useState<"normal" | "fraud">("normal")
  const [loginStage, setLoginStage] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const { colors } = useMode()

  const handleLogin = (type: "normal" | "fraud") => {
    setActiveTab(type)
    setLoginStage(0)
    setShowResult(false)

    // Simulate login process
    const interval = setInterval(() => {
      setLoginStage((prev) => {
        if (prev >= 3) {
          clearInterval(interval)
          setTimeout(() => {
            setShowResult(true)
            if (type === "fraud") {
              playAlertSound()
            }
          }, 500)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  // Updated to use team member names
  const normalStages = [
    { icon: <User size={20} />, text: "Naresh - UPI Verified" },
    { icon: <Fingerprint size={20} />, text: "Sreejith - Aadhaar Scan" },
    { icon: <User size={20} />, text: "Rohan - Face Recognition" },
    { icon: <Shield size={20} />, text: "Guru - Typing Pattern" },
  ]

  const fraudStages = [
    { icon: <User size={20} />, text: "Bhuvan - New SIM Detected" },
    { icon: <Fingerprint size={20} />, text: "Sarupa - Reused PAN" },
    { icon: <MapPin size={20} />, text: "Shreya - Location Mismatch" },
    { icon: <Shield size={20} />, text: "Rakshita - Abnormal Typing" },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "normal" ? colors.button + " text-white" : "bg-gray-100"
          }`}
          onClick={() => handleLogin("normal")}
        >
          Normal User
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "fraud" ? "bg-[#FF5F5D] text-white" : "bg-gray-100"
          }`}
          onClick={() => handleLogin("fraud")}
        >
          Fraudster
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={
                showResult && activeTab === "normal"
                  ? {
                      boxShadow: [
                        "0px 0px 0px rgba(144, 224, 239, 0)",
                        "0px 0px 20px rgba(144, 224, 239, 0.8)",
                        "0px 0px 0px rgba(144, 224, 239, 0)",
                      ],
                    }
                  : {}
              }
              transition={{ repeat: 3, duration: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <User size={40} className="text-gray-500" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {(activeTab === "normal" ? normalStages : fraudStages).map((stage, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index <= loginStage
                    ? activeTab === "normal"
                      ? colors.button + " text-white"
                      : "bg-[#FF5F5D] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {stage.icon}
              </div>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <AnimatePresence>
                    {index <= loginStage && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8 }}
                        className={`h-full ${activeTab === "normal" ? "bg-" + colors.primary : "bg-[#FF5F5D]"}`}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="ml-3 min-w-[140px] text-sm">{stage.text}</div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl ${activeTab === "normal" ? colors.success : colors.danger}`}
            >
              {activeTab === "normal" ? (
                <div className="flex items-center">
                  <Shield size={24} className={colors.text + " mr-3"} />
                  <div>
                    <div className="font-bold">Trust Score: 92</div>
                    <div className="text-sm">All Clear ✅</div>
                  </div>
                </div>
              ) : (
                <motion.div
                  animate={{ x: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center"
                >
                  <AlertTriangle size={24} className="text-[#FF5F5D] mr-3" />
                  <div>
                    <div className="font-bold">Trust Score: 36</div>
                    <div className="text-sm">Suspicious Pattern ⚠️</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
