'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen pt-[60px] bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">出现了一些问题</h2>
                <p className="text-gray-600 mb-4">{error.message}</p>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    重试
                </button>
            </div>
        </div>
    )
} 