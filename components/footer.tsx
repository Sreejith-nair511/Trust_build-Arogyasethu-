import { useMode } from "@/contexts/mode-context"

export default function Footer() {
  const { colors } = useMode()

  return (
    <footer className="w-full py-8 px-4 text-white" style={{ backgroundColor: colors.text }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/80">Made by kdebugger 🛡️</p>
      </div>
    </footer>
  )
}
