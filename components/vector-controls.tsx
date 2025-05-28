"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Vector3D, OperationMode } from "@/app/page"

interface VectorControlsProps {
  vectorU: Vector3D
  vectorV: Vector3D
  onVectorUChange: (vector: Vector3D) => void
  onVectorVChange: (vector: Vector3D) => void
}

export default function VectorControls({
  vectorU,
  vectorV,
  onVectorUChange,
  onVectorVChange,
}: VectorControlsProps) {
  const updateVectorU = (axis: keyof Vector3D, value: number) => {
    onVectorUChange({ ...vectorU, [axis]: value })
  }

  const updateVectorV = (axis: keyof Vector3D, value: number) => {
    onVectorVChange({ ...vectorV, [axis]: value })
  }

  return (
    <div className="space-y-3">
      {/* Vector U Controls */}
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-purple-600 dark:text-purple-400 text-base font-semibold">Vector <strong>u</strong></CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <div key={axis} className="space-y-1">
              <Label className="text-[0.7rem] font-medium">
                {axis.toUpperCase()}: {vectorU[axis].toFixed(1)}
              </Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[vectorU[axis]]}
                  onValueChange={([value]) => updateVectorU(axis, value)}
                  min={-5}
                  max={5}
                  step={0.1}
                  className="flex-1 h-2"
                />
                <Input
                  type="number"
                  value={vectorU[axis]}
                  onChange={(e) => updateVectorU(axis, Number.parseFloat(e.target.value) || 0)}
                  className="w-14 h-7 text-xs"
                  step={0.1}
                  min={-5}
                  max={5}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Vector V Controls */}
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-red-600 dark:text-red-400 text-base font-semibold">Vector <strong>v</strong></CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <div key={axis} className="space-y-1">
              <Label className="text-[0.7rem] font-medium">
                {axis.toUpperCase()}: {vectorV[axis].toFixed(1)}
              </Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[vectorV[axis]]}
                  onValueChange={([value]) => updateVectorV(axis, value)}
                  min={-5}
                  max={5}
                  step={0.1}
                  className="flex-1 h-2"
                />
                <Input
                  type="number"
                  value={vectorV[axis]}
                  onChange={(e) => updateVectorV(axis, Number.parseFloat(e.target.value) || 0)}
                  className="w-14 h-7 text-xs"
                  step={0.1}
                  min={-5}
                  max={5}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
