'use client'

import { useState } from 'react'
import Input from '../ui/Input'

interface RegisterFormProps {
    onSuccess?: (user: any) => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        name: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || '注册失败')
            }

            onSuccess?.(data.user)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="邮箱"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="请输入邮箱"
                required
                disabled={isLoading}
            />

            <Input
                label="昵称"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="请输入昵称"
                disabled={isLoading}
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

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
                {isLoading ? '注册中...' : '注册'}
            </button>
        </form>
    )
} 