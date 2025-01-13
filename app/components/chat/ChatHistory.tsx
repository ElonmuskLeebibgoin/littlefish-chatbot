'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    createdAt: string
    status?: 'sending' | 'sent' | 'error'
    retryCount?: number
    isEditing?: boolean
}

interface ChatHistoryProps {
    messages: Message[]
    onRetry?: (messageId: string) => void
    onEdit?: (messageId: string, newContent: string) => void
    onDelete?: (messageId: string) => void
}

export default function ChatHistory({ messages, onRetry, onEdit, onDelete }: ChatHistoryProps) {
    const [editContent, setEditContent] = useState<string>('')

    const handleEditStart = (message: Message) => {
        setEditContent(message.content)
        onEdit?.(message.id, message.content)
    }

    const handleEditSave = (messageId: string) => {
        onEdit?.(messageId, editContent)
    }

    const formatMessageTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else if (diffInHours < 48) {
            return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
                date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    return (
        <div className="space-y-6">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                    {/* 头像 */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                        <Image
                            src={message.role === 'assistant' ? '/images/mascot.png' : '/images/user-avatar.png'}
                            alt={message.role === 'assistant' ? 'AI' : '用户'}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* 消息内容 */}
                    <div
                        className={`
                            relative max-w-[80%] rounded-lg px-4 py-2 group
                            ${message.role === 'assistant'
                                ? 'bg-white border border-gray-200'
                                : 'bg-blue-500 text-white'
                            }
                            ${message.status === 'sending' ? 'opacity-70' : ''}
                            ${message.status === 'error' ? 'border-red-500' : ''}
                        `}
                    >
                        {/* 操作按钮 */}
                        {message.role === 'user' && message.status === 'sent' && (
                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEditStart(message)}
                                    className="text-xs text-white/80 hover:text-white mr-2"
                                >
                                    编辑
                                </button>
                                <button
                                    onClick={() => onDelete?.(message.id)}
                                    className="text-xs text-white/80 hover:text-white"
                                >
                                    删除
                                </button>
                            </div>
                        )}

                        <div className={`prose prose-sm max-w-none ${message.role === 'user' ? 'text-white prose-invert' : ''}`}>
                            {message.isEditing ? (
                                <div className="flex flex-col gap-2">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="w-full p-2 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40"
                                        rows={3}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit?.(message.id, '')}
                                            className="text-xs text-white/80 hover:text-white"
                                        >
                                            取消
                                        </button>
                                        <button
                                            onClick={() => handleEditSave(message.id)}
                                            className="text-xs text-white/80 hover:text-white"
                                        >
                                            保存
                                        </button>
                                    </div>
                                </div>
                            ) : message.role === 'assistant' ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm, remarkBreaks]}
                                    components={{
                                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                                        pre: ({ children }) => (
                                            <pre className="bg-gray-100 rounded-md p-2 overflow-x-auto">
                                                {children}
                                            </pre>
                                        ),
                                        code: ({ children }) => (
                                            <code className="bg-gray-100 px-1 py-0.5 rounded">
                                                {children}
                                            </code>
                                        ),
                                        em: ({ children }) => <em className="not-italic">{children}</em>
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            ) : (
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            )}
                        </div>

                        {/* 状态和时间 */}
                        <div className="flex items-center justify-end gap-2 mt-1">
                            {message.status === 'sending' && (
                                <span className="text-xs opacity-50">发送中...</span>
                            )}
                            {message.status === 'error' && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-red-500">发送失败</span>
                                    {onRetry && (
                                        <button
                                            onClick={() => onRetry(message.id)}
                                            className="text-xs text-red-500 hover:text-red-600 underline"
                                            disabled={message.retryCount && message.retryCount >= 3}
                                        >
                                            {message.retryCount && message.retryCount >= 3 ? '重试次数过多' : '重试'}
                                        </button>
                                    )}
                                </div>
                            )}
                            <span className="text-xs opacity-50">
                                {formatMessageTime(message.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <p className="text-lg mb-2">👋</p>
                    <p>开始和我聊天吧！</p>
                </div>
            )}
        </div>
    )
} 