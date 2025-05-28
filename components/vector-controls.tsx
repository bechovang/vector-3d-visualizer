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
  mode: OperationMode
  onVectorUChange: (vector: Vector3D) => void
  onVectorVChange: (vector: Vector3D) => void
  onModeChange: (mode: OperationMode) => void
}

export default function VectorControls({
  vectorU,
  vectorV,
  mode,
  onVectorUChange,
  onVectorVChange,
  onModeChange,
}: VectorControlsProps) {
  const updateVectorU = (axis: keyof Vector3D, value: number) => {
    onVectorUChange({ ...vectorU, [axis]: value })
  }

  const updateVectorV = (axis: keyof Vector3D, value: number) => {
    onVectorVChange({ ...vectorV, [axis]: value })
  }

  return (
    <div className="space-y-4">
      {/* Vector U Controls */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-purple-600 dark:text-purple-400 text-lg">Vector <strong>u</strong></CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <div key={axis} className="space-y-1.5">
              <Label className="text-xs font-medium">
                {axis.toUpperCase()}: {vectorU[axis].toFixed(1)}
              </Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[vectorU[axis]]}
                  onValueChange={([value]) => updateVectorU(axis, value)}
                  min={-5}
                  max={5}
                  step={0.1}
                  className="flex-1 h-3"
                />
                <Input
                  type="number"
                  value={vectorU[axis]}
                  onChange={(e) => updateVectorU(axis, Number.parseFloat(e.target.value) || 0)}
                  className="w-16 h-8 text-sm"
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
        <CardHeader className="p-4">
          <CardTitle className="text-red-600 dark:text-red-400 text-lg">Vector <strong>v</strong></CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <div key={axis} className="space-y-1.5">
              <Label className="text-xs font-medium">
                {axis.toUpperCase()}: {vectorV[axis].toFixed(1)}
              </Label>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[vectorV[axis]]}
                  onValueChange={([value]) => updateVectorV(axis, value)}
                  min={-5}
                  max={5}
                  step={0.1}
                  className="flex-1 h-3"
                />
                <Input
                  type="number"
                  value={vectorV[axis]}
                  onChange={(e) => updateVectorV(axis, Number.parseFloat(e.target.value) || 0)}
                  className="w-16 h-8 text-sm"
                  step={0.1}
                  min={-5}
                  max={5}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Operation Mode Selection */}
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Chế Độ Hiển Thị</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <RadioGroup value={mode} onValueChange={(value) => onModeChange(value as OperationMode)} className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cross-product" id="cross-product" />
              <Label htmlFor="cross-product" className="text-sm">Tích có hướng (<strong>u</strong> × <strong>v</strong>)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="projection-u-v" id="projection-u-v" />
              <Label htmlFor="projection-u-v" className="text-sm">Hình chiếu <strong>v</strong> lên <strong>u</strong></Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="projection-v-u" id="projection-v-u" />
              <Label htmlFor="projection-v-u" className="text-sm">Hình chiếu <strong>u</strong> lên <strong>v</strong></Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dot-product" id="dot-product" />
              <Label htmlFor="dot-product" className="text-sm">Tích vô hướng (<strong>u</strong> · <strong>v</strong>)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
