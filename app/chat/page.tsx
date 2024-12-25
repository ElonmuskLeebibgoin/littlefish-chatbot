'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: number
  text: string
  isUser: boolean
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "你好啊!我是小鱼炳,很高兴认识你!我平时喜欢研究AI,也喜欢和大家交流分享。有什么想聊的，我们可以一起探讨~",
      isUser: false,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 自动聚焦输入框
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 调整聊天容器高度
  useEffect(() => {
    const adjustHeight = () => {
      if (chatContainerRef.current) {
        const windowHeight = window.innerHeight
        const topOffset = chatContainerRef.current.offsetTop
        const footerHeight = 80 // 输入框区域高度
        chatContainerRef.current.style.height = `${windowHeight - topOffset - footerHeight}px`
      }
    }

    adjustHeight()
    window.addEventListener('resize', adjustHeight)
    return () => window.removeEventListener('resize', adjustHeight)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input.trim(),
      isUser: true,
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('获取响应失败')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        text: data.text,
        isUser: false,
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('聊天错误:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: error instanceof Error ? error.message : "抱歉，我无法处理你的消息。请重试。",
        isUser: false,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 聊天头部 */}
      <div className="bg-white border-b border-[var(--border-color)] p-4 fixed top-[60px] left-0 right-0 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/mascot.png"
              alt="小鱼炳头像"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">与LittleFish对话</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                让我们开始愉快的交谈吧！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 聊天内容区域 */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto pt-[140px] pb-[80px] px-4"
      >
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in items-end space-x-2`}
            >
              {!message.isUser && (
                <Image
                  src="/images/mascot.png"
                  alt="AI 助手"
                  width={24}
                  height={24}
                  className="rounded-full mb-2"
                />
              )}
              <div
                className={`chat-bubble ${
                  message.isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
                } max-w-[85%] sm:max-w-[70%]`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in items-end space-x-2">
              <Image
                src="/images/mascot.png"
                alt="AI 助手"
                width={24}
                height={24}
                className="rounded-full mb-2"
              />
              <div className="chat-bubble chat-bubble-ai">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border-color)] p-4">
        <form 
          onSubmit={handleSubmit}
          className="container mx-auto max-w-4xl"
        >
          <div className="flex items-center gap-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入你的消息..."
              className="flex-grow bg-[var(--input-background)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn-primary p-3 rounded-lg flex items-center justify-center disabled:opacity-50 transition-opacity duration-200 min-w-[48px]"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 