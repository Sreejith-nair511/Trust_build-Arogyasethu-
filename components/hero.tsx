"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const { mode, colors } = useMode()

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.background} -z-10`} />

      {/* Radial glow behind shield */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full -z-5"
        style={{ backgroundColor: `${colors.primary}20` }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={loaded ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, type: "spring" }}
        className="flex flex-col items-center text-center mb-8"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={loaded ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-6"
        >
          <Shield className="w-24 h-24" style={{ color: colors.primary }} />
          <motion.div
            animate={{
              boxShadow: [
                `0px 0px 0px ${colors.primary}30`,
                `0px 0px 20px ${colors.primary}70`,
                `0px 0px 0px ${colors.primary}30`,
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={loaded ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Agnisethu <span className="text-[#FF5F5D]">🔥</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={loaded ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl font-medium text-white mb-6"
        >
          India&apos;s Firewall of Trust
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={loaded ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col space-y-2 text-white/80"
        >
          <p className="text-sm md:text-base">ಅಗ್ನಿಸೇತು - ವಿಶ್ವಾಸದ ಕೋಟೆ</p>
          <p className="text-sm md:text-base">అగ్నిసేతు - నమ్మకం యొక్క గోడ</p>
          <p className="text-sm md:text-base">அக்னிசேது – நம்பிக்கையின் பாலம்</p>
          <p className="text-sm md:text-base">अग्निसेतु - विश्वास की दीवार</p>
          <p className="text-sm md:text-base">അഗ്നിസേതു - വിശ്വാസത്തിന്റെ മതിൽ</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={loaded ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex flex-col md:flex-row gap-4 mt-8"
      >
        <a
          href="https://sap-fraudvault.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-colors text-white"
          style={{ backgroundColor: colors.primary }}
        >
          Fraud Vault
        </a>
        <a
          href="https://sap-fingerpont.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-colors"
        >
          Fingerpoint
        </a>
        <a
          href="https://trustforge-protocol.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-colors"
        >
          TrustForge
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white/70"
        >
          ↓ Scroll to explore ↓
        </motion.div>
      </motion.div>

      {/* Mode indicator */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }}></div>
        <span className="text-xs text-white font-medium">{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</span>
      </div>
    </section>
  )
}
