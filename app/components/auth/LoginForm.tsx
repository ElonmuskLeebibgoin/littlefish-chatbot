'use client'

import { useState } from 'react'
import Input from '../ui/Input'

interface LoginFormProps {
    onSuccess?: (user: any) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || '登录失败')
            }

            onSuccess?.(data.user)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="邮箱"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                required
                disabled={isLoading}
                error={error}
            />

            <button
                type="submit"
                className={`
                    w-full py-2 px-4 rounded-lg text-white font-medium
                    ${isLoading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }
                    transition-colors
                `}
                disabled={isLoading}
            >
                {isLoading ? '登录中...' : '登录'}
            </button>
        </form>
    )
} 