"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Vector3D, OperationMode } from "@/app/page"

interface CalculationDisplayProps {
  vectorU: Vector3D
  vectorV: Vector3D
  mode: OperationMode
  calculations: any
}

export default function CalculationDisplay({ vectorU, vectorV, mode, calculations }: CalculationDisplayProps) {
  if (!calculations) return null

  const formatVector = (v: Vector3D) => `(${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)})`

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Vectors Đầu Vào
            <Badge variant="outline">Input</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Vector <strong>u</strong></h4>
            <p className="font-mono text-lg">{formatVector(vectorU)}</p>
            <p className="text-sm text-gray-600 mt-1">Độ dài: {calculations.magnitudeU?.toFixed(3)}</p>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Vector <strong>v</strong></h4>
            <p className="font-mono text-lg">{formatVector(vectorV)}</p>
            <p className="text-sm text-gray-600 mt-1">Độ dài: {calculations.magnitudeV?.toFixed(3)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Kết Quả Tính Toán
            <Badge variant="outline">Result</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mode === "cross-product" && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Tích có hướng <strong>u</strong> × <strong>v</strong></h4>
                <p className="font-mono text-lg">{formatVector(calculations.crossProduct)}</p>
                <p className="text-sm text-gray-600 mt-1">Độ dài: {calculations.crossProductMagnitude?.toFixed(3)}</p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Diện tích hình bình hành</h4>
                <p className="text-lg">{calculations.parallelogramArea?.toFixed(3)} đơn vị²</p>
              </div>
            </div>
          )}

          {mode === "projection-u-v" && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hình chiếu <strong>v</strong> lên <strong>u</strong></h4>
              <p className="font-mono text-lg">{formatVector(calculations.projectionUV)}</p>
              <p className="text-sm text-gray-600 mt-1">Độ dài: {calculations.projectionUVMagnitude?.toFixed(3)}</p>
            </div>
          )}

          {mode === "projection-v-u" && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Hình chiếu <strong>u</strong> lên <strong>v</strong></h4>
              <p className="font-mono text-lg">{formatVector(calculations.projectionVU)}</p>
              <p className="text-sm text-gray-600 mt-1">Độ dài: {calculations.projectionVUMagnitude?.toFixed(3)}</p>
            </div>
          )}

          {mode === "dot-product" && (
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Tích vô hướng <strong>u</strong> · <strong>v</strong></h4>
                <p className="text-2xl font-mono">{calculations.dotProduct?.toFixed(3)}</p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Góc giữa hai vector</h4>
                <p className="text-lg">
                  {calculations.angleDegrees?.toFixed(1)}° ({calculations.angleRadians?.toFixed(3)} rad)
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
