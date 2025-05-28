"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OperationMode } from "@/app/page"

interface TheoryDisplayProps {
  mode: OperationMode
}

export default function TheoryDisplay({ mode }: TheoryDisplayProps) {
  const getTheoryContent = () => {
    switch (mode) {
      case "cross-product":
        return {
          title: "Tích Có Hướng (Cross Product)",
          content: (
            <div className="space-y-4">
              <p>
                Tích có hướng của hai vector <strong>u</strong> và <strong>v</strong> là một vector <strong>w</strong>
                vuông góc với cả hai vector ban đầu.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Công thức:</h4>
                <p className="font-mono"><strong>u</strong> × <strong>v</strong> = (u₂v₃ - u₃v₂, u₃v₁ - u₁v₃, u₁v₂ - u₂v₁)</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Tính chất:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Kết quả vuông góc với cả <strong>u</strong> và <strong>v</strong></li>
                  <li>Độ dài bằng diện tích hình bình hành tạo bởi <strong>u</strong> và <strong>v</strong></li>
                  <li>Hướng tuân theo quy tắc bàn tay phải</li>
                  <li><strong>u</strong> × <strong>v</strong> = -(<strong>v</strong> × <strong>u</strong>)</li>
                </ul>
              </div>
            </div>
          ),
        }

      case "projection-u-v":
      case "projection-v-u":
        return {
          title: "Hình Chiếu Vector (Vector Projection)",
          content: (
            <div className="space-y-4">
              <p>
                Hình chiếu của vector <strong>a</strong> lên vector <strong>b</strong> là thành phần của
                <strong>a</strong> theo hướng của <strong>b</strong>.
              </p>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Công thức:</h4>
                <p className="font-mono">proj_<strong>b</strong>(<strong>a</strong>) = ((<strong>a</strong> · <strong>b</strong>) / |<strong>b</strong>|²) × <strong>b</strong></p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Ứng dụng:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Tính thành phần lực theo một hướng</li>
                  <li>Tìm điểm gần nhất trên đường thẳng</li>
                  <li>Phân tích chuyển động trong vật lý</li>
                  <li>Xử lý ánh sáng trong đồ họa máy tính</li>
                </ul>
              </div>
            </div>
          ),
        }

      case "dot-product":
        return {
          title: "Tích Vô Hướng (Dot Product)",
          content: (
            <div className="space-y-4">
              <p>Tích vô hướng của hai vector là một số thực biểu thị mức độ "giống nhau" về hướng của hai vector.</p>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Công thức:</h4>
                <p className="font-mono"><strong>u</strong> · <strong>v</strong> = u₁v₁ + u₂v₂ + u₃v₃ = |<strong>u</strong>||<strong>v</strong>|cos(θ)</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Ý nghĩa:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Dương: góc nhọn (cùng hướng)</li>
                  <li>Âm: góc tù (ngược hướng)</li>
                  <li>Bằng 0: vuông góc</li>
                  <li>Dùng để tính góc giữa hai vector</li>
                </ul>
              </div>
            </div>
          ),
        }

      default:
        return { title: "", content: null }
    }
  }

  const { title, content } = getTheoryContent()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
