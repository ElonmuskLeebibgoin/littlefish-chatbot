'use client'

import { useState } from 'react'
import PaymentQRCode from '@/app/components/PaymentQRCode'
import { questions } from './questions'
import { calculateMBTIResult, typeDescriptions, type Answer, type MBTIResult } from './utils'

export default function TestPage() {
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'testing' | 'completed'>('pending')
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Answer[]>([])
    const [result, setResult] = useState<MBTIResult | null>(null)

    const handlePaymentConfirm = () => {
        setPaymentStatus('paid')
    }

    const handleStartTest = () => {
        setPaymentStatus('testing')
    }

    const handleAnswer = (answer: 'a' | 'b') => {
        const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer }]
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            const result = calculateMBTIResult(newAnswers, questions)
            setResult(result)
            setPaymentStatus('completed')
        }
    }

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">MBTI 性格测试</h1>

                {paymentStatus === 'pending' && (
                    <PaymentQRCode onPaymentConfirm={handlePaymentConfirm} />
                )}

                {paymentStatus === 'paid' && (
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-green-600 mb-2">支付成功！</h2>
                            <p className="text-gray-600 mb-6">准备好开始探索你的性格类型了吗？</p>
                        </div>
                        <button
                            onClick={handleStartTest}
                            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                            开始测试
                        </button>
                    </div>
                )}

                {paymentStatus === 'testing' && (
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        {/* 进度条 */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>问题 {currentQuestion + 1}/{questions.length}</span>
                                <span>{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>

                        {/* 问题 */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                {questions[currentQuestion].text}
                            </h2>
                            <div className="space-y-4">
                                <button
                                    onClick={() => handleAnswer('a')}
                                    className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                >
                                    {questions[currentQuestion].options.a}
                                </button>
                                <button
                                    onClick={() => handleAnswer('b')}
                                    className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                >
                                    {questions[currentQuestion].options.b}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentStatus === 'completed' && result && (
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-blue-600 mb-2">{result.type}</h2>
                            <h3 className="text-xl text-gray-700 mb-4">{typeDescriptions[result.type].name}</h3>
                            <p className="text-gray-600">{typeDescriptions[result.type].description}</p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800">维度分析</h3>
                            {result.dimensions.map((dim, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">{dim.dimension}</span>
                                        <span className="text-blue-600">{Math.round(dim.percentage)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                                            style={{ width: `${dim.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => {
                                    setPaymentStatus('testing')
                                    setCurrentQuestion(0)
                                    setAnswers([])
                                    setResult(null)
                                }}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                重新测试
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 