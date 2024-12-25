import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="h-[40px] bg-[var(--background-color)] border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between text-sm text-[var(--text-secondary)]">
        <div>© 2024 LittleFish. 保留所有权利。</div>
        <div className="flex space-x-4">
          <Link href="/privacy" className="hover:text-[var(--primary-color)]">
            隐私政策
          </Link>
          <Link href="/terms" className="hover:text-[var(--primary-color)]">
            使用条款
          </Link>
        </div>
      </div>
    </footer>
  )
} 