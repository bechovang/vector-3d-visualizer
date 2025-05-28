"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { OperationMode } from "@/app/page"

interface QuizSectionProps {
  mode: OperationMode
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function QuizSection({ mode }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])

  const getQuestions = (): QuizQuestion[] => {
    switch (mode) {
      case "cross-product":
        return [
          {
            id: "cp1",
            question: "Tích có hướng của hai vector <strong>u</strong> = (1, 0, 0) và <strong>v</strong> = (0, 1, 0) là:",
            options: ["(0, 0, 1)", "(0, 0, -1)", "(1, 1, 0)", "(0, 1, 1)"],
            correctAnswer: 0,
            explanation: "<strong>u</strong> × <strong>v</strong> = (0×0 - 0×1, 0×0 - 1×0, 1×1 - 0×0) = (0, 0, 1)",
          },
          {
            id: "cp2",
            question: "Độ dài của tích có hướng <strong>u</strong> × <strong>v</strong> bằng:",
            options: [
              "Diện tích tam giác tạo bởi <strong>u</strong> và <strong>v</strong>",
              "Diện tích hình bình hành tạo bởi <strong>u</strong> và <strong>v</strong>",
              "Chu vi hình bình hành tạo bởi <strong>u</strong> và <strong>v</strong>",
              "Tích độ dài của <strong>u</strong> và <strong>v</strong>",
            ],
            correctAnswer: 1,
            explanation: "|<strong>u</strong> × <strong>v</strong>| = |<strong>u</strong>||<strong>v</strong>|sin(θ) chính là diện tích hình bình hành",
          },
        ]

      case "projection-u-v":
      case "projection-v-u":
        return [
          {
            id: "proj1",
            question: "Hình chiếu của vector <strong>a</strong> lên vector <strong>b</strong> có hướng:",
            options: [
              "Cùng hướng với <strong>a</strong>",
              "Cùng hướng với <strong>b</strong> hoặc ngược hướng với <strong>b</strong>",
              "Vuông góc với <strong>b</strong>",
              "Vuông góc với <strong>a</strong>",
            ],
            correctAnswer: 1,
            explanation: "Hình chiếu luôn nằm trên đường thẳng chứa vector được chiếu lên",
          },
          {
            id: "proj2",
            question: "Khi nào hình chiếu của <strong>a</strong> lên <strong>b</strong> có độ dài bằng |<strong>a</strong>|?",
            options: [
              "Khi <strong>a</strong> và <strong>b</strong> vuông góc",
              "Khi <strong>a</strong> và <strong>b</strong> cùng hướng hoặc ngược hướng",
              "Khi |<strong>a</strong>| = |<strong>b</strong>|",
              "Không bao giờ",
            ],
            correctAnswer: 1,
            explanation: "Khi góc giữa hai vector là 0° hoặc 180°, cos(θ) = ±1",
          },
        ]

      case "dot-product":
        return [
          {
            id: "dot1",
            question: "Tích vô hướng <strong>u</strong> · <strong>v</strong> = 0 có nghĩa là:",
            options: [
              "Một trong hai vector bằng vector không",
              "Hai vector vuông góc với nhau",
              "Hai vector cùng hướng",
              "Cả A và B đều đúng",
            ],
            correctAnswer: 3,
            explanation: "<strong>u</strong> · <strong>v</strong> = 0 khi cos(θ) = 0 (vuông góc) hoặc khi một vector bằng 0",
          },
          {
            id: "dot2",
            question: "Góc giữa hai vector <strong>u</strong> = (1, 1, 0) và <strong>v</strong> = (1, -1, 0) là:",
            options: ["0°", "45°", "90°", "180°"],
            correctAnswer: 2,
            explanation: "<strong>u</strong> · <strong>v</strong> = 1×1 + 1×(-1) + 0×0 = 0, nên góc = 90°",
          },
        ]

      default:
        return []
    }
  }

  const questions = getQuestions()

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return

    const isCorrect = Number.parseInt(selectedAnswer) === questions[currentQuestion].correctAnswer
    if (isCorrect && !answeredQuestions.includes(currentQuestion)) {
      setScore(score + 1)
      setAnsweredQuestions([...answeredQuestions, currentQuestion])
    }
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Chưa có câu hỏi cho chế độ này</p>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bài Tập Trắc Nghiệm</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Câu {currentQuestion + 1}/{questions.length}
            </Badge>
            <Badge variant="secondary">
              Điểm: {score}/{questions.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showResult} />
                <Label
                  htmlFor={`option-${index}`}
                  className={`cursor-pointer ${
                    showResult && index === question.correctAnswer
                      ? "text-green-600 font-medium"
                      : showResult && index.toString() === selectedAnswer && index !== question.correctAnswer
                        ? "text-red-600"
                        : ""
                  }`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {showResult && (
          <div
            className={`p-4 rounded-lg ${
              Number.parseInt(selectedAnswer) === question.correctAnswer
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`font-medium ${
                Number.parseInt(selectedAnswer) === question.correctAnswer ? "text-green-700" : "text-red-700"
              }`}
            >
              {Number.parseInt(selectedAnswer) === question.correctAnswer ? "✓ Chính xác!" : "✗ Sai rồi!"}
            </p>
            <p className="text-sm mt-2 text-gray-700">
              <strong>Giải thích:</strong> {question.explanation}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult ? (
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="flex-1">
              Kiểm tra đáp án
            </Button>
          ) : (
            <>
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={nextQuestion} className="flex-1">
                  Câu tiếp theo
                </Button>
              ) : (
                <Button onClick={resetQuiz} className="flex-1">
                  Làm lại từ đầu
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
