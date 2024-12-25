'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu } from 'lucide-react'

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

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setSearchResults([])
    
    try {
      // 获取搜索结果
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

  // 当用户输入时自动触发搜索
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch()
      }, 500) // 500ms 防抖
      return () => clearTimeout(debounceTimer)
    }
  }

  return (
    <nav className="h-[60px] bg-white border-b border-[var(--border-color)] fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="LittleFish Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-[var(--primary-color)]">小鱼炳AI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="nav-link">
              首页
            </Link>
            <Link href="/about" className="nav-link">
              关于我
            </Link>
            <Link href="/chat" className="nav-link">
              AI 聊天
            </Link>
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

            {/* Search Results Dropdown */}
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
            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--primary-color)]">
              <Image
                src="/images/mascot.png"
                alt="用户头像"
                width={40}
                height={40}
                className="object-cover"
              />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
              <a href="#" className="block px-4 py-2 hover:bg-[var(--background-color)]">个人资料</a>
              <a href="#" className="block px-4 py-2 hover:bg-[var(--background-color)]">设置</a>
              <hr className="my-2 border-[var(--border-color)]" />
              <a href="#" className="block px-4 py-2 hover:bg-[var(--background-color)]">退出登录</a>
            </div>
          </div>
           
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-[var(--icon-color)]" />
          </button>
        </div>
      </div>

      {/* Click Outside Handler */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </nav>
  )
} 