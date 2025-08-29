"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, LinkIcon, CheckCircle, Lock } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

export default function BlockchainLogging() {
  const [isLogging, setIsLogging] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const { colors } = useMode()

  const handleLogFraud = () => {
    if (isLogged) return

    setIsLogging(true)
    setTimeout(() => {
      setIsLogging(false)
      setIsLogged(true)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle size={24} className="text-[#FF5F5D] mr-3" />
          <div>
            <h3 className="font-bold">Fraud Alert #4327</h3>
            <p className="text-sm text-gray-500">Suspicious UPI Transaction</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Wallet Address:</span>
            <span className="font-mono">0x7e2b...8f3a</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount:</span>
            <span className="font-medium">₹12,300</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Risk Score:</span>
            <span className="text-[#FF5F5D] font-medium">High (87/100)</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogFraud}
          disabled={isLogging || isLogged}
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center ${
            isLogged ? colors.success : "bg-[#FF5F5D] text-white"
          }`}
        >
          {isLogging ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              <span>Recording on Blockchain...</span>
            </>
          ) : isLogged ? (
            <>
              <CheckCircle size={18} className="mr-2" />
              <span>Recorded on AgnisethuChain</span>
            </>
          ) : (
            <>
              <LinkIcon size={18} className="mr-2" />
              <span>Record Fraud on Blockchain</span>
            </>
          )}
        </motion.button>
      </div>

      {isLogged && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#F1F3F4] rounded-2xl p-6"
        >
          <h3 className="font-bold mb-4 flex items-center">
            <LinkIcon size={20} className={colors.text + " mr-2"} />
            Blockchain Record
          </h3>

          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <div
                className={`w-8 h-8 rounded-full bg-${colors.secondary} flex items-center justify-center mr-2 mt-1 flex-shrink-0`}
              >
                <Lock size={16} className={colors.text} />
              </div>
              <div>
                <div className="font-medium text-sm">Transaction Hash</div>
                <div className="text-xs font-mono bg-white p-2 rounded-lg mt-1 break-all">
                  0x7b2c8f4e9d6a5b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full bg-${colors.secondary} flex items-center justify-center mr-2 flex-shrink-0`}
              >
                <AlertTriangle size={16} className={colors.text} />
              </div>
              <div>
                <div className="font-medium text-sm">Wallet Impact</div>
                <div className="text-xs text-[#FF5F5D] font-medium mt-1">₹12,300 Frozen</div>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full bg-${colors.secondary} flex items-center justify-center mr-2 flex-shrink-0`}
              >
                <CheckCircle size={16} className={colors.text} />
              </div>
              <div>
                <div className="font-medium text-sm">Status</div>
                <div className={`text-xs ${colors.text} font-medium mt-1`}>Confirmed (6 blocks)</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className={`w-8 h-8 ${colors.button} rounded-md flex items-center justify-center text-white text-xs`}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
