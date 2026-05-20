import { useNavigate } from 'react-router-dom'
import { Puzzle, Pin } from 'lucide-react'

export default function ReadyScreen() {
  const navigate = useNavigate()

  return (
    <>
      {/* Top right tooltip */}
      <div className="fixed top-6 right-6 bg-[#18181A] text-white p-4 rounded-xl flex items-center shadow-2xl border border-white/5 animate-in fade-in slide-in-from-top-4 duration-500 z-50">
        <div className="w-12 h-12 bg-gradient-to-b from-[#1E3A8A] to-[#2563EB] rounded-xl flex items-center justify-center mr-4 shadow-inner border border-blue-400/20">
          <span className="text-white font-extrabold text-xl">X</span>
        </div>
        <div>
          <p className="font-bold text-[15px]">Pin the X-Wallet extension</p>
          <p className="text-[13px] text-[#8E8E93] flex items-center mt-1">
            click <Puzzle size={14} className="mx-1" /> and then <Pin size={14} className="mx-1" />
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-[380px] w-full mx-auto bg-[#131314] px-6 py-10 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
        {/* Confetti effect using SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 380 300">
          <path d="M 60 50 L 65 60 L 75 62 L 67 68 L 69 78 L 60 73 L 51 78 L 53 68 L 45 62 L 55 60 Z" fill="#6366f1" opacity="0.8" transform="scale(0.5) translate(60, 50)" />
          <path d="M 320 80 L 325 90 L 335 92 L 327 98 L 329 108 L 320 103 L 311 108 L 313 98 L 305 92 L 315 90 Z" fill="#8b5cf6" opacity="0.8" transform="scale(0.6) translate(150, 20)" />
          <rect x="150" y="40" width="6" height="12" fill="#ef4444" opacity="0.9" transform="rotate(30 150 40)" />
          <rect x="230" y="30" width="10" height="4" fill="#3b82f6" opacity="0.9" transform="rotate(-20 230 30)" />
          <rect x="200" y="60" width="5" height="5" fill="#f59e0b" opacity="0.9" transform="rotate(45 200 60)" />
          <rect x="110" y="80" width="6" height="8" fill="#ef4444" opacity="0.9" transform="rotate(-15 110 80)" />
          <rect x="280" y="100" width="12" height="5" fill="#ef4444" opacity="0.9" transform="rotate(60 280 100)" />
          <rect x="300" y="60" width="6" height="6" fill="#3b82f6" opacity="0.9" transform="rotate(15 300 60)" />
        </svg>

        <div className="w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.2)] mb-8 z-10 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          <div className="absolute inset-[2px] bg-gradient-to-b from-white/20 to-transparent rounded-xl"></div>
          <span className="text-white font-extrabold text-4xl shadow-sm relative z-10">X</span>
        </div>

        <h2 className="text-[22px] font-bold text-white mb-3 z-10">X-Wallet is ready to use</h2>
        
        <p className="text-[#8E8E93] text-[14px] mb-8 leading-relaxed z-10 max-w-[280px]">
          Pin the X-Wallet Extension to your toolbar for easy access.
        </p>

        <button 
          onClick={() => navigate('/')} 
          className="bg-[#007AFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#005bb5] transition-colors z-10 w-48 text-[15px]"
        >
          Open wallet
        </button>
      </div>
    </>
  )
}
