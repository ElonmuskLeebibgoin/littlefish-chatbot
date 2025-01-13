'use client'

import Image from 'next/image'
import { Brain, Heart, Lightbulb, Target } from 'lucide-react'

export default function About() {
  const traits = [
    { icon: <Lightbulb className="w-6 h-6" />, name: '创造力', value: 85 },
    { icon: <Heart className="w-6 h-6" />, name: '热情', value: 90 },
    { icon: <Brain className="w-6 h-6" />, name: '学习能力', value: 88 },
    { icon: <Target className="w-6 h-6" />, name: '专注度', value: 82 },
  ]

  const timeline = [
    {
      year: '2020',
      title: '开始编程之旅',
      description: '接触编程，对技术产生浓厚兴趣'
    },
    {
      year: '2021',
      title: '深入学习',
      description: '系统学习各种编程技术，参与多个项目开发'
    },
    {
      year: '2022',
      title: '项目实践',
      description: '独立开发多个项目，积累实战经验'
    },
    {
      year: '2023',
      title: '探索 AI',
      description: '专注于 AI 领域，开发智能应用'
    }
  ]

  return (
    <div className="min-h-screen pt-[60px]">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full bg-white">
        <Image
          src="/images/about_bg.jpg"
          alt="关于我的封面图"
          fill
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-bold mb-6">一个热爱创造和创新的开发者</h1>
          <p className="text-lg max-w-2xl mx-auto">
            始终保持学习的热情，乐于与他人分享知识，致力于构建能够产生影响力的有意义项目。
          </p>
        </div>
      </div>

      {/* Personality Traits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">性格特征</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {traits.map((trait, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[var(--primary-color)]">{trait.icon}</div>
                  <h3 className="text-xl font-semibold">{trait.name}</h3>
                  <span className="ml-auto text-lg font-medium">{trait.value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary-color)] rounded-full transition-all duration-1000"
                    style={{ width: `${trait.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">我的历程</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-[var(--primary-color)] last:pb-0">
                <div className="absolute left-[-8px] top-0 w-4 h-4 bg-[var(--primary-color)] rounded-full" />
                <div className="bg-white rounded-lg p-6 shadow-lg ml-4">
                  <div className="text-sm text-[var(--primary-color)] font-semibold mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 