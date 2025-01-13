'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setSearchResults([])

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) {
        throw new Error('搜索请求失败')
      }
      const results = await response.json()
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch()
      }, 500)
      return () => clearTimeout(debounceTimer)
    }
  }

  // 导航链接配置，添加更丰富的颜色和hover效果
  const navLinks = [
    {
      href: '/',
      text: '首页',
      color: 'blue',
      hoverBg: 'hover:bg-blue-50',
      activeColor: 'text-blue-600',
      hoverColor: 'hover:text-blue-500',
      borderColor: 'border-blue-500'
    },
    {
      href: '/about',
      text: '关于我',
      color: 'green',
      hoverBg: 'hover:bg-green-50',
      activeColor: 'text-green-600',
      hoverColor: 'hover:text-green-500',
      borderColor: 'border-green-500'
    },
    {
      href: '/personality',
      text: '个性特征',
      color: 'purple',
      hoverBg: 'hover:bg-purple-50',
      activeColor: 'text-purple-600',
      hoverColor: 'hover:text-purple-500',
      borderColor: 'border-purple-500'
    },
    {
      href: '/chat',
      text: 'AI 聊天',
      color: 'pink',
      hoverBg: 'hover:bg-pink-50',
      activeColor: 'text-pink-600',
      hoverColor: 'hover:text-pink-500',
      borderColor: 'border-pink-500'
    },
  ]

  return (
    <nav className="h-[60px] bg-white border-b border-[var(--border-color)] fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            <Image
              src="/images/纯Logo.png"
              alt="LittleFish Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-sm"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              小鱼炳AI
            </span>
          </Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative px-3 py-1.5 rounded-md transition-all duration-300
                  ${pathname === link.href ? link.activeColor : 'text-gray-600'}
                  ${link.hoverColor} ${link.hoverBg}
                  group hover:shadow-sm
                `}
              >
                {link.text}
                <span className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                  ${link.borderColor} 
                  transition-all duration-300 
                  group-hover:w-4/5
                  ${pathname === link.href ? 'w-4/5' : 'w-0'}
                `} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索..."
                className="search-input pl-10 pr-10"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsSearchOpen(true)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--icon-color)] w-4 h-4" />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
              )}
            </form>

            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-[var(--border-color)] max-h-[400px] overflow-y-auto">
                {searchResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.url}
                    className="block p-4 hover:bg-[var(--background-color)] border-b border-[var(--border-color)] last:border-b-0"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <h3 className="font-semibold mb-1">{result.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{result.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-pink-500 transition-colors duration-300 transform hover:scale-105 hover:shadow-md">
              <Image
                src="/images/mascot.png"
                alt="用户头像"
                width={40}
                height={40}
                className="object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-1 hidden group-hover:block transform origin-top-right transition-all duration-200 border border-gray-100">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors">
                个人资料
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors">
                设置
              </a>
              <hr className="my-1 border-gray-100" />
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors">
                退出登录
              </a>
            </div>
          </div>

          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[-1]"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </nav>
  )
} 