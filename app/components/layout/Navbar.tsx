'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full h-[60px] bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo and main navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-primary">
            LittleFish
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="nav-link">
              首页
            </Link>
            <Link href="/about" className="nav-link">
              关于我
            </Link>
            <Link href="/chat" className="nav-link">
              AI聊天
            </Link>
          </div>
        </div>

        {/* Search and user profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索..."
              className="w-[200px] h-[40px] px-4 rounded-lg bg-[#F1F3F4] border border-[#DADCE0] focus:border-primary focus:outline-none transition-colors duration-300"
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-colors duration-300"
            >
              <Image
                src="/images/avatar.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 animate-fade-in">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  个人资料
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  设置
                </a>
                <hr className="my-2" />
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  退出
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 