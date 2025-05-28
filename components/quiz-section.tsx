"use client"

import { useState, useEffect } from "react"
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

// Define a type for the whole quiz bank data structure
interface QuizBankData {
  [key: string]: QuizQuestion[]
}

export default function QuizSection({ mode }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])

  const [quizBank, setQuizBank] = useState<QuizBankData | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuizBank = async () => {
      try {
        setLoading(true)
        const response = await fetch("/data/quizbank.json")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: QuizBankData = await response.json()
        setQuizBank(data)
      } catch (e: any) {
        setError(e.message || "Failed to load quiz questions.")
        console.error("Error fetching quiz data:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizBank()
  }, [])

  useEffect(() => {
    if (!quizBank) return;

    let currentModeKey = mode as string;
    if (mode === "projection-u-v" || mode === "projection-v-u") {
      currentModeKey = "projection";
    }
    setQuestions(quizBank[currentModeKey] || [])
    // Reset quiz state when mode changes or questions are loaded
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])

  }, [mode, quizBank])

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || questions.length === 0) return

    const isCorrect = Number.parseInt(selectedAnswer) === questions[currentQuestionIndex].correctAnswer
    if (isCorrect && !answeredQuestions.includes(currentQuestionIndex)) {
      setScore(score + 1)
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex])
    }
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
  }

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Đang tải...</CardTitle></CardHeader>
        <CardContent><p>Đang tải câu hỏi trắc nghiệm...</p></CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader><CardTitle>Lỗi</CardTitle></CardHeader>
        <CardContent><p>Không thể tải câu hỏi: {error}</p></CardContent>
      </Card>
    )
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

  const question = questions[currentQuestionIndex]
  if (!question) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Câu hỏi không hợp lệ hoặc không tìm thấy.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bài Tập Trắc Nghiệm</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Câu {currentQuestionIndex + 1}/{questions.length}
            </Badge>
            <Badge variant="secondary">
              Điểm: {score}/{questions.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4" dangerouslySetInnerHTML={{ __html: question.question }}></h3>

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
                  dangerouslySetInnerHTML={{ __html: option }}
                >
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
              <strong>Giải thích:</strong> <span dangerouslySetInnerHTML={{ __html: question.explanation }}></span>
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
              {currentQuestionIndex < questions.length - 1 ? (
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
