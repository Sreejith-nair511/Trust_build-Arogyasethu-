"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, AlertTriangle, Snowflake, Code, ChevronDown } from "lucide-react"
import { useMode } from "@/contexts/mode-context"

export default function ModeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentMode, setCurrentMode, colors } = useMode()

  const modes = [
    {
      id: "safe",
      name: "Safe Mode",
      icon: <Shield size={16} />,
      color: "bg-emerald-600",
      textColor: "text-emerald-600",
    },
    {
      id: "emergency",
      name: "Emergency Mode",
      icon: <AlertTriangle size={16} />,
      color: "bg-red-600",
      textColor: "text-red-600",
    },
    {
      id: "cooldown",
      name: "Cooldown Mode",
      icon: <Snowflake size={16} />,
      color: "bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      id: "developer",
      name: "Developer Mode",
      icon: <Code size={16} />,
      color: "bg-purple-600",
      textColor: "text-purple-600",
    },
  ]

  const currentModeData = modes.find((mode) => mode.id === currentMode) || modes[0]

  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${currentModeData.color} text-white px-3 py-2 rounded-full flex items-center shadow-lg`}
      >
        <span className="mr-2">{currentModeData.icon}</span>
        <span className="text-xs font-medium mr-1">{currentModeData.name}</span>
        <ChevronDown size={14} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            {modes.map((mode) => (
              <motion.button
                key={mode.id}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                onClick={() => {
                  setCurrentMode(mode.id as "safe" | "emergency" | "cooldown" | "developer")
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left flex items-center ${
                  currentMode === mode.id ? "bg-gray-100" : ""
                }`}
              >
                <span className={`mr-3 ${mode.textColor}`}>{mode.icon}</span>
                <span className="text-sm font-medium">{mode.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
