"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VectorControls from "@/components/vector-controls"
import ThreeScene from "@/components/three-scene"
import CalculationDisplay from "@/components/calculation-display"
import TheoryDisplay from "@/components/theory-display"
import QuizSection from "@/components/quiz-section"
import { calculateVectorOperations } from "@/lib/math-utils"

export type Vector3D = {
  x: number
  y: number
  z: number
}

export type OperationMode = "cross-product" | "projection-u-v" | "projection-v-u" | "dot-product"

export default function VectorVisualizer() {
  const [vectorU, setVectorU] = useState<Vector3D>({ x: 2, y: 1, z: 0 })
  const [vectorV, setVectorV] = useState<Vector3D>({ x: 1, y: 2, z: 1 })
  const [mode, setMode] = useState<OperationMode>("cross-product")
  const [calculations, setCalculations] = useState<any>(null)

  useEffect(() => {
    const results = calculateVectorOperations(vectorU, vectorV, mode)
    setCalculations(results)
  }, [vectorU, vectorV, mode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Trực Quan Hóa Vector 3D</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Khám phá tích có hướng, hình chiếu và các phép toán vector trong không gian 3D
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel & Calculations - Combined */}
          <div className="lg:col-span-1 space-y-6">
            <Card> {/* Outer Card for combined view */}
              <CardHeader className="p-4">
                <CardTitle className="text-xl">Bảng Điều Khiển & Kết Quả</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-6">
                <VectorControls
                  vectorU={vectorU}
                  vectorV={vectorV}
                  onVectorUChange={setVectorU}
                  onVectorVChange={setVectorV}
                />
                <CalculationDisplay vectorU={vectorU} vectorV={vectorV} mode={mode} calculations={calculations} />
              </CardContent>
            </Card>
          </div>

          {/* 3D Scene */}
          <div className="lg:col-span-2 space-y-4">
            <Select value={mode} onValueChange={(value) => setMode(value as OperationMode)}>
              <SelectTrigger className="w-full md:w-[280px] mb-4">
                <SelectValue placeholder="Chọn chế độ hiển thị" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cross-product">Tích có hướng (u × v)</SelectItem>
                <SelectItem value="projection-u-v">Hình chiếu v lên u</SelectItem>
                <SelectItem value="projection-v-u">Hình chiếu u lên v</SelectItem>
                <SelectItem value="dot-product">Tích vô hướng (u · v)</SelectItem>
              </SelectContent>
            </Select>
            
            <Card className="p-4 h-[calc(100vh-16rem)] min-h-[400px] lg:min-h-[600px]">
              <ThreeScene vectorU={vectorU} vectorV={vectorV} mode={mode} calculations={calculations} />
            </Card>
          </div>
        </div>

        {/* Information Panel (Theory & Quiz) */}
        <div className="mt-8">
          <Tabs defaultValue="theory" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="theory">Lý Thuyết</TabsTrigger>
              <TabsTrigger value="quiz">Bài Tập</TabsTrigger>
            </TabsList>

            <TabsContent value="theory" className="mt-6">
              <TheoryDisplay mode={mode} />
            </TabsContent>

            <TabsContent value="quiz" className="mt-6">
              <QuizSection mode={mode} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
