'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book, Code, Music, Camera, MessageCircle } from 'lucide-react'

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  const interests = [
    { icon: <Book className="w-8 h-8" />, title: '阅读', description: '喜欢通过书籍探索新的世界' },
    { icon: <Code className="w-8 h-8" />, title: '编程', description: '热衷于用代码创造新事物' },
    { icon: <Music className="w-8 h-8" />, title: '音乐', description: '享受各种类型的音乐' },
    { icon: <Camera className="w-8 h-8" />, title: '摄影', description: '捕捉美好的瞬间' },
  ]

  return (
    <div className="space-y-16 pt-[60px]">
      {/* Hero Section */}
      <div 
        className="relative min-h-[600px] w-full overflow-hidden cursor-pointer bg-black"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="container mx-auto px-4 relative">
          <div className="aspect-[16/9] relative">
            <Image
              src="/images/hero-1.jpg"
              alt="World of AI"
              fill
              className="object-contain transform transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <div className={`transform transition-all duration-700 ${
              isHovered 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                探索 AI 的无限世界
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                开发者 • 创造者 • 梦想家
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/about" 
                  className="btn-primary bg-white/10 backdrop-blur-sm hover:bg-white/20 inline-flex items-center space-x-2 text-lg"
                >
                  了解更多
                </Link>
                <Link 
                  href="/chat" 
                  className="btn-primary inline-flex items-center space-x-2 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>开始聊天</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* 提示文字 */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm transform transition-all duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="flex flex-col items-center space-y-2">
            <span className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 15m0 0l-2-5 2 5zm0 0h6" />
              </svg>
            </span>
            <span className="font-medium tracking-wider">移动鼠标探索更多</span>
          </div>
        </div>
      </div>

      {/* Personal Introduction */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative flex-shrink-0">
            <Image
              src="/images/mascot.png"
              alt="LittleFish 头像"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-4">关于我</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              你好！我是 LittleFish，一个对技术和创造充满热情的人。
              通过这个网站，我想分享我的经历，并与志同道合的人建立联系。
              欢迎使用我的 AI 助手了解更多关于我的信息！
            </p>
            <Link 
              href="/about" 
              className="text-[var(--primary-color)] hover:text-[var(--hover-primary)] font-medium"
            >
              了解更多 →
            </Link>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">我的兴趣爱好</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-[var(--primary-color)] mb-4 flex justify-center">
                {interest.icon}
              </div>
              <h3 className="font-bold mb-2">{interest.title}</h3>
              <p className="text-[var(--text-secondary)]">{interest.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Chat Introduction */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-[var(--primary-color)] text-white rounded-xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-20" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">来和我聊天吧</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              想了解我更多吗？或者有什么技术问题想讨论？
              点击下方按钮，我们可以开始一场有趣的对话~
            </p>
            <Link 
              href="/chat" 
              className="inline-flex items-center space-x-2 bg-white text-[var(--primary-color)] px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span>开始聊天</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
