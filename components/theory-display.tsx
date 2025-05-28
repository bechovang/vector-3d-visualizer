"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OperationMode } from "@/app/page"

interface TheoryDisplayProps {
  mode: OperationMode
}

interface TheoryContent {
  title: string
  content: string // HTML content as a string
}

interface TheoryData {
  [key: string]: TheoryContent
}

export default function TheoryDisplay({ mode }: TheoryDisplayProps) {
  const [theoryData, setTheoryData] = useState<TheoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTheory = async () => {
      try {
        setLoading(true)
        const response = await fetch("/data/theory.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: TheoryData = await response.json()
        setTheoryData(data)
      } catch (e: any) {
        setError(e.message || "Failed to load theory content.")
        console.error("Error fetching theory data:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchTheory()
  }, [])

  const getTheoryContent = () => {
    if (!theoryData) return { title: "", content: "" }

    let currentModeKey = mode as string;
    if (mode === "projection-u-v" || mode === "projection-v-u") {
      currentModeKey = "projection";
    }
    
    return theoryData[currentModeKey] || { title: "Lý Thuyết", content: "<p>Nội dung không tồn tại.</p>" }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Đang tải...</CardTitle></CardHeader>
        <CardContent><p>Đang tải nội dung lý thuyết...</p></CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader><CardTitle>Lỗi</CardTitle></CardHeader>
        <CardContent><p>Không thể tải nội dung: {error}</p></CardContent>
      </Card>
    )
  }

  const { title, content } = getTheoryContent()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {/* Render HTML content safely */}
      <CardContent dangerouslySetInnerHTML={{ __html: content }} /> 
    </Card>
  )
}
