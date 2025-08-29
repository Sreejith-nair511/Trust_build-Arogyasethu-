"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ForceGraph2D from "react-force-graph-2d"
import { useMode } from "@/contexts/mode-context"

interface Node {
  id: string
  name: string
  status: "trusted" | "flagged" | "watchlist"
  details: {
    ip: string
    aadhaar: string
    wallets: string[]
    role?: string
  }
}

interface Link {
  source: string
  target: string
  value: number
}

export default function TrustGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 })
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const [graphData, setGraphData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  })
  const { colors } = useMode()

  useEffect(() => {
    // Generate sample graph data with team member names
    const nodes: Node[] = []
    const links: Link[] = []

    // Create team members as trusted users
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

    // Add team members as trusted nodes
    teamMembers.forEach((member) => {
      nodes.push({
        id: member.id,
        name: member.name,
        status: "trusted",
        details: {
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          aadhaar: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          wallets: [
            `0x${Math.random().toString(16).substring(2, 10)}`,
            `0x${Math.random().toString(16).substring(2, 10)}`,
          ],
          role: member.role,
        },
      })
    })

    // Create additional trusted users
    for (let i = 1; i <= 7; i++) {
      nodes.push({
        id: `user${i}`,
        name: `User ${i}`,
        status: "trusted",
        details: {
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          aadhaar: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          wallets: [
            `0x${Math.random().toString(16).substring(2, 10)}`,
            `0x${Math.random().toString(16).substring(2, 10)}`,
          ],
        },
      })
    }

    // Create flagged fraudsters
    for (let i = 1; i <= 3; i++) {
      nodes.push({
        id: `fraud${i}`,
        name: `Fraudster ${i}`,
        status: "flagged",
        details: {
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          aadhaar: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          wallets: [
            `0x${Math.random().toString(16).substring(2, 10)}`,
            `0x${Math.random().toString(16).substring(2, 10)}`,
          ],
        },
      })
    }

    // Create watchlist nodes
    for (let i = 1; i <= 5; i++) {
      nodes.push({
        id: `watch${i}`,
        name: `Watchlist ${i}`,
        status: "watchlist",
        details: {
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          aadhaar: `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
          wallets: [
            `0x${Math.random().toString(16).substring(2, 10)}`,
            `0x${Math.random().toString(16).substring(2, 10)}`,
          ],
        },
      })
    }

    // Create links
    nodes.forEach((node) => {
      // Each node connects to 1-3 other nodes
      const numLinks = Math.floor(1 + Math.random() * 3)
      for (let i = 0; i < numLinks; i++) {
        const targetIndex = Math.floor(Math.random() * nodes.length)
        if (nodes[targetIndex].id !== node.id) {
          links.push({
            source: node.id,
            target: nodes[targetIndex].id,
            value: 1,
          })
        }
      }
    })

    // Connect team members to each other
    for (let i = 0; i < teamMembers.length; i++) {
      for (let j = i + 1; j < teamMembers.length; j++) {
        if (Math.random() > 0.3) {
          // 70% chance to connect team members
          links.push({
            source: teamMembers[i].id,
            target: teamMembers[j].id,
            value: 2, // Stronger connection
          })
        }
      }
    }

    setGraphData({ nodes, links })

    // Set dimensions based on container
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.min(500, window.innerHeight * 0.6),
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Trust Network Graph</h3>
          <div className="flex flex-wrap space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.trusted }} />
              <span className="text-xs ml-2">Trusted</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.flagged }} />
              <span className="text-xs ml-2">Flagged</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.watchlist }} />
              <span className="text-xs ml-2">Watchlist</span>
            </div>
          </div>
        </div>

        <div className="h-[400px] bg-[#F1F3F4] rounded-xl overflow-hidden">
          {graphData.nodes.length > 0 && (
            <ForceGraph2D
              graphData={graphData}
              width={dimensions.width}
              height={dimensions.height}
              nodeRelSize={6}
              nodeColor={(node: any) =>
                node.status === "trusted"
                  ? colors.trusted
                  : node.status === "flagged"
                    ? colors.flagged
                    : colors.watchlist
              }
              linkColor={() => "#CCCCCC"}
              linkWidth={(link: any) => (link.value === 2 ? 2 : 1)}
              onNodeHover={(node: any) => setHoveredNode(node)}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.name
                const fontSize = 12 / globalScale
                ctx.font = `${fontSize}px Sans-Serif`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2)

                ctx.fillStyle =
                  node.status === "trusted"
                    ? colors.trusted
                    : node.status === "flagged"
                      ? colors.flagged
                      : colors.watchlist
                ctx.beginPath()
                ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI)
                ctx.fill()

                if (hoveredNode && hoveredNode.id === node.id) {
                  ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
                  ctx.fillRect(
                    node.x - bckgDimensions[0] / 2,
                    node.y - bckgDimensions[1] / 2 - 15,
                    bckgDimensions[0],
                    bckgDimensions[1],
                  )

                  ctx.textAlign = "center"
                  ctx.textBaseline = "middle"
                  ctx.fillStyle = "#1E2022"
                  ctx.fillText(label, node.x, node.y - 15)
                }
              }}
            />
          )}
        </div>
      </div>

      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg z-10 w-64 ${
            hoveredNode.status === "trusted"
              ? "border-l-4 border-" + colors.trusted
              : hoveredNode.status === "flagged"
                ? "border-l-4 border-" + colors.flagged
                : "border-l-4 border-" + colors.watchlist
          }`}
        >
          <h4 className="font-bold mb-2">{hoveredNode.name}</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">Status:</span>{" "}
              <span
                style={{
                  color:
                    hoveredNode.status === "trusted"
                      ? colors.trusted
                      : hoveredNode.status === "flagged"
                        ? colors.flagged
                        : colors.watchlist,
                }}
                className="font-medium"
              >
                {hoveredNode.status.charAt(0).toUpperCase() + hoveredNode.status.slice(1)}
              </span>
            </div>
            {hoveredNode.details.role && (
              <div>
                <span className="text-gray-500">Role:</span>{" "}
                <span className="font-medium">{hoveredNode.details.role}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500">IP Address:</span>{" "}
              <span className="font-mono">{hoveredNode.details.ip}</span>
            </div>
            <div>
              <span className="text-gray-500">Aadhaar:</span>{" "}
              <span className="font-mono">{hoveredNode.details.aadhaar}</span>
            </div>
            <div>
              <span className="text-gray-500">Linked Wallets:</span>
              <div className="font-mono text-xs mt-1 space-y-1">
                {hoveredNode.details.wallets.map((wallet, i) => (
                  <div key={i} className="bg-[#F1F3F4] p-1 rounded">
                    {wallet}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
