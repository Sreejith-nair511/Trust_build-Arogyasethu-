"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Shield, CheckCircle, XCircle } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

export default function SmartContractSimulation() {
  const [activeTab, setActiveTab] = useState<"trusted" | "suspicious">("trusted")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const { colors } = useMode()

  const handleVerify = (type: "trusted" | "suspicious") => {
    setActiveTab(type)
    setIsVerifying(true)
    setIsVerified(false)

    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "trusted" ? colors.button + " text-white" : "bg-gray-100"
          }`}
          onClick={() => handleVerify("trusted")}
        >
          Trusted User
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "suspicious" ? "bg-[#FF5F5D] text-white" : "bg-gray-100"
          }`}
          onClick={() => handleVerify("suspicious")}
        >
          Suspicious User
        </button>
      </div>

      <div className="p-6">
        <div className="bg-[#F1F3F4] rounded-xl p-4 mb-6">
          <div className="flex items-center mb-3">
            <ShoppingCart size={20} className={colors.text + " mr-2"} />
            <h3 className="font-medium">E-Commerce Checkout</h3>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID:</span>
              <span>#AGN-{Math.floor(10000 + Math.random() * 90000)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount:</span>
              <span>₹8,499</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment:</span>
              <span>UPI</span>
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="text-xs text-center text-gray-500">This transaction requires TrustPassport verification</div>
        </div>

        <div className="flex justify-center mb-6">
          {isVerifying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
              className={`w-16 h-16 border-4 ${activeTab === "trusted" ? "border-" + colors.text : "border-[#FF5F5D]"} border-t-transparent rounded-full`}
            />
          ) : isVerified ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-16 h-16 rounded-full flex items-center justify-center"
            >
              {activeTab === "trusted" ? (
                <CheckCircle size={64} className={colors.text} />
              ) : (
                <XCircle size={64} className="text-[#FF5F5D]" />
              )}
            </motion.div>
          ) : (
            <Shield size={64} className="text-gray-300" />
          )}
        </div>

        {isVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-center ${activeTab === "trusted" ? colors.success : colors.danger}`}
          >
            {activeTab === "trusted" ? (
              <>
                <div className="font-bold">TrustScore = 91</div>
                <div className={`text-sm ${colors.text}`}>Order Confirmed ✅</div>
              </>
            ) : (
              <>
                <div className="font-bold">TrustScore = 40</div>
                <div className="text-sm text-[#FF5F5D]">Access Denied – Suspicious Profile ⚠️</div>
              </>
            )}
          </motion.div>
        )}

        {isVerified && activeTab === "trusted" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs text-center text-gray-500"
          >
            Smart Contract executed: 0x7b2c...9f4e
          </motion.div>
        )}
      </div>
    </div>
  )
}
