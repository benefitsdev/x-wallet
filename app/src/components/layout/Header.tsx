import { Link } from 'react-router-dom'
import { Globe, ShieldCheck, ExternalLink } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
}

const isPopup = typeof chrome !== 'undefined' && !!chrome.runtime?.id && window.location.pathname.includes('popup.html')

const openFullApp = () => {
  if (typeof chrome !== 'undefined' && chrome.runtime?.id) {
    window.open(chrome.runtime.getURL('index.html'), '_blank')
  }
}

export default function Header({ onMenuClick: _onMenuClick }: HeaderProps) {
  return (
    <header className="h-[72px] flex items-center justify-between px-6 shrink-0 bg-[#0B0B0D]">
      <div className="flex items-center gap-3">
        {/* X-Wallet Logo */}
        <div className="w-[34px] h-[34px] bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
          <span className="text-white font-extrabold text-[16px] shadow-sm relative z-10 leading-none">X</span>
        </div>
        <Link to="/" className="text-[22px] font-black text-white tracking-widest cursor-pointer uppercase italic">
          X-WALLET
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {isPopup && (
          <button
            onClick={openFullApp}
            className="flex items-center space-x-1.5 text-xs text-[#007AFF] hover:text-blue-400 transition-colors font-semibold"
          >
            <ExternalLink size={14} />
            <span>Open Full App</span>
          </button>
        )}
        {/* Public / Private Toggle */}
        <div className="flex bg-[#262626] rounded-full p-1 border border-white/5 items-center">
          <button className="flex items-center space-x-1.5 bg-[#007AFF] text-white px-4 py-1.5 rounded-full text-[13px] font-semibold shadow-sm">
            <Globe size={15} />
            <span>Public</span>
          </button>
          <button className="flex items-center space-x-1.5 text-[#8E8E93] hover:text-white px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors">
            <ShieldCheck size={15} />
            <span>Private</span>
          </button>
        </div>
      </div>
    </header>
  )
}
