"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"

type TeamMember = {
  name: string
  role: string
}

export default function TeamShowcase() {
  const team: TeamMember[] = [
    { name: "Naresh", role: "UI/UX" },
    { name: "Sreejith", role: "AI Models" },
    { name: "Rohan", role: "Blockchain Dev" },
    { name: "Guru", role: "Full Stack" },
    { name: "Sarupa", role: "Research & Data" },
    { name: "Shreya", role: "Behavioral Analysis" },
    { name: "Bhuvan", role: "Graph Engine" },
    { name: "Rakshita", role: "Frontend & Animations" },
  ]

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
          <h2 className="text-3xl font-bold text-[#1E2022] mb-4">Meet the Guardians of Agnisethu 🔥</h2>
          <p className="text-lg text-[#1E2022]/70">The team behind India&apos;s Firewall of Trust</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl p-4 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#008080]/10 flex items-center justify-center mb-3">
                <User className="w-8 h-8 text-[#008080]" />
              </div>
              <h3 className="font-bold text-[#1E2022]">{member.name}</h3>
              <p className="text-sm text-[#1E2022]/70">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
