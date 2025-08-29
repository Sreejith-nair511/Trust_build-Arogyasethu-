"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Shield, QrCode, CheckCircle } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

interface TrustPassportProps {
  triggerConfetti: () => void
}

export default function TrustPassport({ triggerConfetti }: TrustPassportProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const { colors } = useMode()

  const handleMint = () => {
    if (isMinted) return

    setIsMinting(true)
    setTimeout(() => {
      setIsMinting(false)
      setIsMinted(true)
      triggerConfetti()
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ rotateY: 0 }}
        animate={isMinting ? { rotateY: 360 } : {}}
        transition={{ duration: 1.5 }}
        className="w-full max-w-xs mb-6"
      >
        <div className={`bg-gradient-to-br ${colors.gradient} rounded-2xl p-1`}>
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">TrustPassport</h3>
                <p className="text-xs text-gray-500">Digital Identity NFT</p>
              </div>
              <Shield className={colors.text} size={24} />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#F1F3F4] flex items-center justify-center mr-2">
                  <QrCode size={16} />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Device Fingerprint</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {isMinted ? "fd7e:b9a2:6370:1f5c" : "••••:••••:••••:••••"}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#F1F3F4] flex items-center justify-center mr-2">
                  <Shield size={16} />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Aadhaar Hash</div>
                  <div className="text-xs text-gray-500 font-mono">{isMinted ? "0x7b2c...9f4e" : "0x••••...••••"}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#F1F3F4] flex items-center justify-center mr-2">
                  <QrCode size={16} />
                </div>
                <div className="text-sm">
                  <div className="font-medium">Location Hash</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {isMinted ? "IN-KA-BLR-560001" : "••-••-•••-••••••"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {isMinted && (
                <div className="w-24 h-24 p-1 border border-dashed border-[#008080] rounded-lg flex items-center justify-center">
                  <QrCode size={80} />
                </div>
              )}
            </div>

            {isMinted && (
              <div className="mt-4 flex items-center justify-center text-xs text-[#008080]">
                <CheckCircle size={12} className="mr-1" />
                <span>Verified by Agnisethu Smart Contract</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMint}
        disabled={isMinting}
        className={`flex items-center px-6 py-3 rounded-xl font-medium ${
          isMinted ? colors.success : colors.button + " text-white"
        }`}
      >
        {isMinting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            <span>Minting...</span>
          </>
        ) : isMinted ? (
          <>
            <Download size={18} className="mr-2" />
            <span>Download TrustPassport</span>
          </>
        ) : (
          <>
            <Shield size={18} className="mr-2" />
            <span>Mint TrustPassport NFT</span>
          </>
        )}
      </motion.button>
    </div>
  )
}
