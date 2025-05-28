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
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          Kết Quả Phép Toán
          <Badge variant="secondary">{mode.replace("-", " ")}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {mode === "cross-product" && calculations.crossProduct && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
              Tích có hướng <strong>u</strong> × <strong>v</strong>
            </h4>
            <p className="font-mono text-md">{formatVector(calculations.crossProduct)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Độ dài: {calculations.crossProductMagnitude?.toFixed(3)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Diện tích hình bình hành: {calculations.parallelogramArea?.toFixed(3)}
            </p>
          </div>
        )}

        {mode === "projection-u-v" && calculations.projectionUV && (
          <div className="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg">
            <h4 className="font-semibold text-sky-700 dark:text-sky-300 mb-1">
              Hình chiếu <strong>v</strong> lên <strong>u</strong>
            </h4>
            <p className="font-mono text-md">{formatVector(calculations.projectionUV)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Độ dài: {calculations.projectionUVMagnitude?.toFixed(3)}
            </p>
          </div>
        )}

        {mode === "projection-v-u" && calculations.projectionVU && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
              Hình chiếu <strong>u</strong> lên <strong>v</strong>
            </h4>
            <p className="font-mono text-md">{formatVector(calculations.projectionVU)}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Độ dài: {calculations.projectionVUMagnitude?.toFixed(3)}
            </p>
          </div>
        )}

        {mode === "dot-product" && (
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">
                Tích vô hướng <strong>u</strong> · <strong>v</strong>
              </h4>
              <p className="text-xl font-mono">{calculations.dotProduct?.toFixed(3)}</p>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
                Góc giữa hai vector
              </h4>
              <p className="text-md">
                {calculations.angleDegrees?.toFixed(1)}° ({calculations.angleRadians?.toFixed(3)} rad)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
