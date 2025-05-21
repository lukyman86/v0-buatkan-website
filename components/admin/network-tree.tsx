"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

// Definisi tipe data untuk node jaringan
interface NetworkNode {
  id: number
  name: string
  email: string
  membershipType: string
  level: number
  children: NetworkNode[]
  totalDownline: number
}

interface NetworkTreeProps {
  data: NetworkNode
  onNodeSelect?: (id: number) => void
}

export function NetworkTree({ data, onNodeSelect }: NetworkTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({
    [data.id]: true, // Root node selalu expanded
  })

  const toggleNode = (id: number) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "Basic":
        return "bg-gray-100 text-gray-800"
      case "Silver":
        return "bg-gray-200 text-gray-800"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      case "Platinum":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderNode = (node: NetworkNode, isRoot = false) => {
    const isExpanded = expandedNodes[node.id] || false
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} className={`flex flex-col items-center ${isRoot ? "" : "mt-4"}`}>
        <div className={`relative flex flex-col items-center ${isRoot ? "mb-8" : ""}`}>
          <Card
            className={`w-48 p-3 cursor-pointer hover:shadow-md transition-shadow ${
              isRoot ? "border-green-500 border-2" : ""
            }`}
            onClick={() => onNodeSelect && onNodeSelect(node.id)}
          >
            <div className="text-center">
              <div className="font-medium truncate">{node.name}</div>
              <div className="text-xs text-gray-500 truncate">{node.email}</div>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getMembershipColor(
                    node.membershipType,
                  )}`}
                >
                  {node.membershipType}
                </span>
              </div>
              <div className="mt-1 text-xs">
                <span className="text-gray-500">Downline: {node.totalDownline}</span>
              </div>
            </div>
          </Card>
          {hasChildren && (
            <button
              className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                isExpanded ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => toggleNode(node.id)}
            >
              {isExpanded ? "-" : "+"}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="relative">
            <div className="absolute top-0 left-1/2 w-px h-4 bg-gray-300"></div>
            <div className="pt-4">
              <div className="relative flex flex-wrap justify-center gap-4">
                {node.children.map((child, index) => (
                  <div key={child.id} className="relative">
                    {index > 0 && <div className="absolute top-0 left-[-16px] w-8 h-px bg-gray-300"></div>}
                    {renderNode(child)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return <div className="flex justify-center">{renderNode(data, true)}</div>
}
