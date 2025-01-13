'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const router = useRouter()

    const handleSuccess = (user: any) => {
        // TODO: 保存用户信息到状态管理
        console.log('认证成功:', user)
        router.push('/')
    }

    return (
        <div className="min-h-screen pt-[60px] flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                {/* 切换按钮 */}
                <div className="flex mb-8 bg-gray-100 p-1 rounded-lg">
                    <button
                        className={`
                            flex-1 py-2 text-center rounded-md transition-colors
                            ${mode === 'login'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-gray-900'
                            }
                        `}
                        onClick={() => setMode('login')}
                    >
                        登录
                    </button>
                    <button
                        className={`
                            flex-1 py-2 text-center rounded-md transition-colors
                            ${mode === 'register'
                                ? 'bg-white text-blue-600 shadow'
                                : 'text-gray-600 hover:text-gray-900'
                            }
                        `}
                        onClick={() => setMode('register')}
                    >
                        注册
                    </button>
                </div>

                {/* 表单 */}
                {mode === 'login' ? (
                    <LoginForm onSuccess={handleSuccess} />
                ) : (
                    <RegisterForm onSuccess={handleSuccess} />
                )}
            </div>
        </div>
    )
} 