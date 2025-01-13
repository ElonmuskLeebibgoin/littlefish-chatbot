'use client'

import { useState, useEffect, useRef } from 'react'
import ChatHistory from '../components/chat/ChatHistory'
import { v4 as uuidv4 } from 'uuid'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  status?: 'sending' | 'sent' | 'error'
  retryCount?: number
}

export default function ChatPage() {
  const userId = 'test-user-id' // TODO: 从状态管理中获取用户ID

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // 加载历史消息
  const loadHistoryMessages = async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    try {
      const response = await fetch(`/api/chat/history?userId=${userId}&page=${page}&limit=20`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '加载历史消息失败')
      }

      if (data.messages.length < 20) {
        setHasMore(false)
      }

      setMessages(prev => [...data.messages, ...prev])
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('加载历史消息失败:', error)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // 监听滚动加载更多
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    if (scrollTop === 0 && !isLoadingMore && hasMore) {
      loadHistoryMessages()
    }
  }

  // 初始加载
  useEffect(() => {
    loadHistoryMessages()
  }, [])

  // 自动滚动到最新消息
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          userId
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '发送消息失败')
      }

      // 更新用户消息状态
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id
          ? { ...msg, status: 'sent' }
          : msg
      ))

      // 创建AI消息占位
      const aiMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: '',
        createdAt: new Date().toISOString(),
        status: 'sending'
      }
      setMessages(prev => [...prev, aiMessage])

      // 读取流式响应
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const text = decoder.decode(value)
            // 更新AI消息内容
            setMessages(prev => prev.map(msg =>
              msg.id === aiMessage.id
                ? { ...msg, content: msg.content + text }
                : msg
            ))
          }

          // 完成后更新消息状态
          setMessages(prev => prev.map(msg =>
            msg.id === aiMessage.id
              ? { ...msg, status: 'sent' }
              : msg
          ))
        } catch (error) {
          console.error('读取响应流时出错:', error)
          setMessages(prev => prev.map(msg =>
            msg.id === aiMessage.id
              ? { ...msg, status: 'error' }
              : msg
          ))
        } finally {
          reader.releaseLock()
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      // 更新失败消息状态
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id
          ? { ...msg, status: 'error' }
          : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  // 处理消息重试
  const handleRetry = async (messageId: string) => {
    const targetMessage = messages.find(msg => msg.id === messageId)
    if (!targetMessage) return

    // 更新重试次数
    setMessages(prev => prev.map(msg =>
      msg.id === messageId
        ? { ...msg, status: 'sending', retryCount: (msg.retryCount || 0) + 1 }
        : msg
    ))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: targetMessage.content,
          userId
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '发送消息失败')
      }

      // 更新消息状态
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'sent' }
          : msg
      ))

      // 读取流式响应
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const text = decoder.decode(value)
            // 更新AI消息内容
            setMessages(prev => prev.map(msg =>
              msg.id === messageId
                ? { ...msg, content: msg.content + text }
                : msg
            ))
          }
        } catch (error) {
          console.error('读取响应流时出错:', error)
          setMessages(prev => prev.map(msg =>
            msg.id === messageId
              ? { ...msg, status: 'error' }
              : msg
          ))
        } finally {
          reader.releaseLock()
        }
      }
    } catch (error) {
      console.error('重试失败:', error)
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'error' }
          : msg
      ))
    }
  }

  // 处理消息编辑
  const handleEdit = async (messageId: string, newContent: string) => {
    // 如果是取消编辑
    if (!newContent) {
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, isEditing: false }
          : msg
      ))
      return
    }

    // 如果是开始编辑
    if (newContent === messages.find(msg => msg.id === messageId)?.content) {
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, isEditing: true }
          : msg
      ))
      return
    }

    // 如果是保存编辑
    try {
      const response = await fetch(`/api/chat/message/${messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newContent,
          userId
        }),
      })

      if (!response.ok) {
        throw new Error('更新消息失败')
      }

      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, content: newContent, isEditing: false }
          : msg
      ))
    } catch (error) {
      console.error('编辑消息失败:', error)
      // 保持编辑状态，让用户可以重试
    }
  }

  // 处理消息删除
  const handleDelete = async (messageId: string) => {
    if (!confirm('确定要删除这条消息吗？')) return

    try {
      const response = await fetch(`/api/chat/message/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        throw new Error('删除消息失败')
      }

      setMessages(prev => prev.filter(msg => msg.id !== messageId))
    } catch (error) {
      console.error('删除消息失败:', error)
      alert('删除消息失败，请重试')
    }
  }

  return (
    <div className="min-h-screen pt-[60px] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 聊天头部 */}
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">与 LittleFish 对话</h2>
            <p className="text-sm text-gray-600">让我们开始愉快的交谈吧！</p>
          </div>

          {/* 聊天历史 */}
          <div
            ref={chatContainerRef}
            className="h-[600px] overflow-y-auto p-6 scroll-smooth"
            onScroll={handleScroll}
          >
            {isLoadingMore && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
            <ChatHistory
              messages={messages}
              onRetry={handleRetry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* 输入框 */}
          <div className="border-t p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="输入消息..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`
                  px-6 py-2 rounded-lg text-white font-medium
                  ${isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                  }
                  transition-colors
                `}
                disabled={isLoading}
              >
                {isLoading ? '发送中...' : '发送'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 