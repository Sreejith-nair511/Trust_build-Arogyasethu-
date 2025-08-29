"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import ForceGraph2D from "react-force-graph-2d"
import { useMode } from "@/contexts/mode-context"
import { User } from "lucide-react"

type Node = {
  id: string
  name: string
  status: "trusted" | "flagged" | "watchlist"
  role?: string
  aadhaar: string
  ip: string
  wallets: string[]
}

type Link = {
  source: string
  target: string
  type: string
}

export default function TrustGraph() {
  const graphRef = useRef<any>(null)
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 })
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null)
  const { colors } = useMode()

  // Team members (Guardians of Agnisethu)
  const teamMembers = [
    { id: "naresh", name: "Naresh", role: "UI/UX" },
    { id: "sreejith", name: "Sreejith", role: "AI Models" },
    { id: "rohan", name: "Rohan", role: "Blockchain Dev" },
    { id: "guru", name: "Guru", role: "Full Stack" },
    { id: "sarupa", name: "Sarupa", role: "Research & Data" },
    { id: "shreya", name: "Shreya", role: "Behavioral Analysis" },
    { id: "bhuvan", name: "Bhuvan", role: "Graph Engine" },
    { id: "rakshita", name: "Rakshita", role: "Frontend & Animations" },
  ]

  // Sample data for the trust graph
  const graphData = {
    nodes: [
      {
        id: "naresh",
        name: "Naresh",
        status: "trusted",
        role: "UI/UX",
        aadhaar: "XXXX-XXXX-7890",
        ip: "103.27.XX.XX",
        wallets: ["0x1a2b...3c4d", "0x5e6f...7g8h"],
      },
      {
        id: "sreejith",
        name: "Sreejith",
        status: "trusted",
        role: "AI Models",
        aadhaar: "XXXX-XXXX-1234",
        ip: "49.36.XX.XX",
        wallets: ["0x9i0j...1k2l"],
      },
      {
        id: "rohan",
        name: "Rohan",
        status: "trusted",
        role: "Blockchain Dev",
        aadhaar: "XXXX-XXXX-5678",
        ip: "122.15.XX.XX",
        wallets: ["0x3m4n...5o6p"],
      },
      {
        id: "user4",
        name: "Unknown",
        status: "flagged",
        aadhaar: "XXXX-XXXX-9012",
        ip: "185.73.XX.XX",
        wallets: ["0x7q8r...9s0t", "0x1u2v...3w4x"],
      },
      {
        id: "guru",
        name: "Guru",
        status: "trusted",
        role: "Full Stack",
        aadhaar: "XXXX-XXXX-3456",
        ip: "117.55.XX.XX",
        wallets: ["0x5y6z...7a8b"],
      },
      {
        id: "sarupa",
        name: "Sarupa",
        status: "watchlist",
        role: "Research & Data",
        aadhaar: "XXXX-XXXX-7890",
        ip: "45.112.XX.XX",
        wallets: ["0x9c0d...1e2f"],
      },
      {
        id: "shreya",
        name: "Shreya",
        status: "trusted",
        role: "Behavioral Analysis",
        aadhaar: "XXXX-XXXX-1234",
        ip: "103.27.XX.XX",
        wallets: ["0x3g4h...5i6j"],
      },
      {
        id: "user8",
        name: "Unknown",
        status: "flagged",
        aadhaar: "XXXX-XXXX-5678",
        ip: "91.243.XX.XX",
        wallets: ["0x7k8l...9m0n"],
      },
      {
        id: "bhuvan",
        name: "Bhuvan",
        status: "trusted",
        role: "Graph Engine",
        aadhaar: "XXXX-XXXX-2468",
        ip: "122.15.XX.XX",
        wallets: ["0x3m4n...5o6p"],
      },
      {
        id: "rakshita",
        name: "Rakshita",
        status: "trusted",
        role: "Frontend & Animations",
        aadhaar: "XXXX-XXXX-1357",
        ip: "117.55.XX.XX",
        wallets: ["0x5y6z...7a8b"],
      },
    ] as Node[],
    links: [
      { source: "naresh", target: "sreejith", type: "transaction" },
      { source: "naresh", target: "rohan", type: "transaction" },
      { source: "sreejith", target: "guru", type: "transaction" },
      { source: "rohan", target: "shreya", type: "transaction" },
      { source: "user4", target: "sarupa", type: "transaction" },
      { source: "user4", target: "user8", type: "transaction" },
      { source: "guru", target: "shreya", type: "transaction" },
      { source: "sarupa", target: "user8", type: "transaction" },
      { source: "bhuvan", target: "rakshita", type: "transaction" },
      { source: "bhuvan", target: "naresh", type: "transaction" },
      { source: "rakshita", target: "shreya", type: "transaction" },
    ] as Link[],
  }

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("graph-container")
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.min(500, window.innerHeight * 0.6),
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  const handleNodeHover = (node: Node | null) => {
    setHoveredNode(node)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY })
  }

  const getNodeColor = (node: Node) => {
    switch (node.status) {
      case "trusted":
        return colors.secondary
      case "flagged":
        return "#FF5F5D"
      case "watchlist":
        return "#FFC107"
      default:
        return "#CCCCCC"
    }
  }

  const handleTeamMemberClick = (memberId: string) => {
    setSelectedTeamMember(memberId === selectedTeamMember ? null : memberId)

    if (graphRef.current && memberId !== selectedTeamMember) {
      const node = graphData.nodes.find((n) => n.id === memberId)
      if (node) {
        const distance = 40
        const distRatio = 1 + distance / Math.hypot(node.x, node.y)
        graphRef.current.centerAt(node.x, node.y, 1000)
        setTimeout(() => {
          graphRef.current.zoom(2.5, 1000)
        }, 500)
      }
    }
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
          <h2 className="text-3xl font-bold text-[#1E2022] mb-4">Trust Graph View</h2>
          <p className="text-lg text-[#1E2022]/70">Visualize connections between users and detect fraud patterns</p>
        </motion.div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#1E2022] mb-4">Guardians of Agnisethu 🔥</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {teamMembers.map((member) => (
              <motion.button
                key={member.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTeamMemberClick(member.id)}
                className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                  selectedTeamMember === member.id ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${colors.primary}20` }}
                >
                  <User className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <span className="font-medium text-sm">{member.name}</span>
                <span className="text-xs text-gray-500">{member.role}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div id="graph-container" className="bg-[#F1F3F4] rounded-2xl p-4 relative" onMouseMove={handleMouseMove}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-[#1E2022]">Network Analysis</h3>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.secondary }}></div>
                <span>Trusted</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FFC107] mr-2"></div>
                <span>Watchlist</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FF5F5D] mr-2"></div>
                <span>Flagged</span>
              </div>
            </div>
          </div>

          <div className="h-[400px] bg-white rounded-xl overflow-hidden">
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              width={dimensions.width}
              height={dimensions.height}
              nodeRelSize={6}
              nodeColor={(node: any) => getNodeColor(node as Node)}
              linkColor={() => "#CCCCCC"}
              linkWidth={1}
              onNodeHover={(node: any) => handleNodeHover(node as Node)}
              cooldownTicks={100}
              nodeLabel={(node: any) => (node as Node).name}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.name
                const fontSize = 12 / globalScale
                ctx.font = `${fontSize}px Sans-Serif`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2)

                ctx.fillStyle = getNodeColor(node as Node)
                ctx.beginPath()
                ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false)
                ctx.fill()

                if (node.id === selectedTeamMember) {
                  ctx.strokeStyle = colors.primary
                  ctx.lineWidth = 2 / globalScale
                  ctx.beginPath()
                  ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false)
                  ctx.stroke()
                }

                ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + 6, bckgDimensions[0], bckgDimensions[1])

                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#1E2022"
                ctx.fillText(label, node.x, node.y + 6 + fontSize / 2)
              }}
            />
          </div>

          {hoveredNode && (
            <div
              className="absolute bg-white p-3 rounded-lg shadow-lg text-sm z-10"
              style={{
                left: mousePos.x + 10,
                top: mousePos.y + 10,
                maxWidth: "250px",
              }}
            >
              <div className="font-bold mb-1">{hoveredNode.name}</div>
              <div className="space-y-1 text-xs">
                {hoveredNode.role && (
                  <div className="flex justify-between">
                    <span className="text-[#1E2022]/70">Role:</span>
                    <span className="font-medium">{hoveredNode.role}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#1E2022]/70">Status:</span>
                  <span
                    className={`font-medium ${
                      hoveredNode.status === "trusted"
                        ? "text-[#008080]"
                        : hoveredNode.status === "flagged"
                          ? "text-[#FF5F5D]"
                          : "text-[#FFC107]"
                    }`}
                  >
                    {hoveredNode.status.charAt(0).toUpperCase() + hoveredNode.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E2022]/70">Aadhaar:</span>
                  <span>{hoveredNode.aadhaar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1E2022]/70">IP:</span>
                  <span>{hoveredNode.ip}</span>
                </div>
                <div>
                  <span className="text-[#1E2022]/70">Wallets:</span>
                  <div className="mt-1">
                    {hoveredNode.wallets.map((wallet, index) => (
                      <div key={index} className="truncate">
                        {wallet}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
