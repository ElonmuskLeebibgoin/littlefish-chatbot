'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PersonalityPage() {
    const [activeTab, setActiveTab] = useState('mbti')

    const mbtiData = {
        type: 'INTJ',
        nickname: '建筑师',
        description: '富有创造力的战略家，擅长制定系统性的计划和新颖的想法',
        traits: [
            {
                dimension: '内向 (Introversion)',
                percentage: 65,
                description: '倾向于独处思考，从内在世界获取能量'
            },
            {
                dimension: '直觉 (iNtuition)',
                percentage: 82,
                description: '关注可能性和未来，喜欢抽象和理论'
            },
            {
                dimension: '思维 (Thinking)',
                percentage: 75,
                description: '重视逻辑和客观分析，追求真理'
            },
            {
                dimension: '判断 (Judging)',
                percentage: 70,
                description: '喜欢计划和组织，追求确定性'
            }
        ],
        strengths: [
            '战略性思维',
            '独立性强',
            '创新能力',
            '追求卓越',
            '分析能力强'
        ],
        values: [
            '持续学习和成长',
            '追求真理和知识',
            '保持独立思考',
            '实现目标的决心',
            '注重效率和完美'
        ]
    }

    return (
        <div className="min-h-screen pt-[60px]">
            {/* 页面标题 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">个性特征</h1>
                    <p className="text-xl opacity-90">探索性格特征，了解自我价值</p>
                </div>
            </div>

            {/* 内容导航 */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex space-x-4 mb-8">
                    <button
                        className={`px-6 py-2 rounded-full ${activeTab === 'mbti'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveTab('mbti')}
                    >
                        MBTI 性格
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full ${activeTab === 'values'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveTab('values')}
                    >
                        价值观
                    </button>
                </div>

                {/* MBTI 内容 */}
                {activeTab === 'mbti' && (
                    <div className="space-y-8">
                        {/* MBTI 类型卡片 */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-blue-600">{mbtiData.type}</h2>
                                    <p className="text-xl text-gray-600">{mbtiData.nickname}</p>
                                </div>
                                <Link
                                    href="/personality/test"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                                >
                                    开始测试
                                </Link>
                            </div>
                            <p className="text-gray-700 mb-6">{mbtiData.description}</p>

                            {/* 特征维度 */}
                            <div className="space-y-4">
                                {mbtiData.traits.map((trait, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{trait.dimension}</span>
                                            <span className="text-blue-600">{trait.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 rounded-full h-2"
                                                style={{ width: `${trait.percentage}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{trait.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 优势和价值观 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold mb-4">性格优势</h3>
                                <ul className="space-y-2">
                                    {mbtiData.strengths.map((strength, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                            {strength}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold mb-4">核心价值观</h3>
                                <ul className="space-y-2">
                                    {mbtiData.values.map((value, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* 价值观内容 */}
                {activeTab === 'values' && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">生活哲学与价值观</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-3">生活信条</h3>
                                <p className="text-gray-700">
                                    追求持续成长，保持开放和好奇心。相信通过不断学习和实践，每个人都能突破自己的限制，达到更高的境界。
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">工作态度</h3>
                                <p className="text-gray-700">
                                    追求卓越，注重细节。相信优秀的作品源于对完美的不懈追求，同时也要懂得平衡和取舍。
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">人生目标</h3>
                                <p className="text-gray-700">
                                    希望通过技术创新为社会创造价值，同时在追求专业成长的过程中实现自我价值。
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 