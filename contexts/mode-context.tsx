"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Mode = "safe" | "emergency" | "cooldown" | "developer"

interface ModeContextType {
  currentMode: Mode
  setCurrentMode: (mode: Mode) => void
  colors: {
    primary: string
    secondary: string
    text: string
    border: string
    gradient: string
    button: string
    buttonHover: string
    trusted: string
    flagged: string
    watchlist: string
    success: string
    danger: string
  }
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = useState<Mode>("safe")

  const getModeColors = () => {
    switch (currentMode) {
      case "safe":
        return {
          primary: "#10b981",
          secondary: "#d1fae5",
          text: "#047857",
          border: "#6ee7b7",
          gradient: "from-emerald-500 to-emerald-700",
          button: "bg-emerald-600 hover:bg-emerald-700",
          buttonHover: "bg-emerald-700",
          trusted: "#4ade80",
          flagged: "#f87171",
          watchlist: "#fcd34d",
          success: "bg-emerald-100 text-emerald-700",
          danger: "bg-red-100 text-red-700",
        }
      case "emergency":
        return {
          primary: "#ef4444",
          secondary: "#fee2e2",
          text: "#b91c1c",
          border: "#fca5a5",
          gradient: "from-red-500 to-red-700",
          button: "bg-red-600 hover:bg-red-700",
          buttonHover: "bg-red-700",
          trusted: "#4ade80",
          flagged: "#ef4444",
          watchlist: "#fcd34d",
          success: "bg-red-100 text-red-700",
          danger: "bg-red-200 text-red-800",
        }
      case "cooldown":
        return {
          primary: "#3b82f6",
          secondary: "#dbeafe",
          text: "#1d4ed8",
          border: "#93c5fd",
          gradient: "from-blue-500 to-blue-700",
          button: "bg-blue-600 hover:bg-blue-700",
          buttonHover: "bg-blue-700",
          trusted: "#60a5fa",
          flagged: "#f87171",
          watchlist: "#fcd34d",
          success: "bg-blue-100 text-blue-700",
          danger: "bg-red-100 text-red-700",
        }
      case "developer":
        return {
          primary: "#8b5cf6",
          secondary: "#ede9fe",
          text: "#6d28d9",
          border: "#c4b5fd",
          gradient: "from-purple-500 to-purple-700",
          button: "bg-purple-600 hover:bg-purple-700",
          buttonHover: "bg-purple-700",
          trusted: "#a78bfa",
          flagged: "#f87171",
          watchlist: "#fcd34d",
          success: "bg-purple-100 text-purple-700",
          danger: "bg-red-100 text-red-700",
        }
      default:
        return {
          primary: "#008080",
          secondary: "#e6ffff",
          text: "#008080",
          border: "#90E0EF",
          gradient: "from-[#008080] to-[#6C63FF]",
          button: "bg-[#6C63FF] hover:bg-[#5A52E0]",
          buttonHover: "bg-[#5A52E0]",
          trusted: "#90E0EF",
          flagged: "#FF5F5D",
          watchlist: "#FFD166",
          success: "bg-[#90E0EF]/20 text-[#008080]",
          danger: "bg-[#FF5F5D]/20 text-[#FF5F5D]",
        }
    }
  }

  const colors = getModeColors()

  return <ModeContext.Provider value={{ currentMode, setCurrentMode, colors }}>{children}</ModeContext.Provider>
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
