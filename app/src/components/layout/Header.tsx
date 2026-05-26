// import { Link } from 'react-router-dom'
import { Globe, ShieldCheck, ExternalLink, Menu } from 'lucide-react'
import { useViewMode } from '@/store/ViewModeContext'

interface HeaderProps {
  onMenuClick?: () => void
}

const isPopup = typeof chrome !== 'undefined' && !!chrome.runtime?.id && window.location.pathname.includes('popup.html')

const openFullApp = () => {
  if (typeof chrome !== 'undefined' && chrome.runtime?.id) {
    window.open(chrome.runtime.getURL('index.html'), '_blank')
  }
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { viewMode, setViewMode } = useViewMode()

  return (
    <header className="h-[72px] flex items-center justify-between px-6 shrink-0 bg-[#0B0B0D]">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white/80 hover:text-white transition-colors cursor-pointer mr-1"
          >
            <Menu size={20} />
          </button>
        )}
        {/* ZKX Wallet Logo */}
        <img src="/dashboardlogo..png" alt="ZKX Wallet" className="w-[124px] h-[44px]" />
      </div>

      <div className="flex items-center gap-3">
        {isPopup && (
          <button
            onClick={openFullApp}
            className="flex items-center space-x-1.5 text-xs text-[#007AFF] hover:text-blue-400 transition-colors font-semibold animate-pulse"
          >
            <ExternalLink size={14} />
            <span>Open Full App</span>
          </button>
        )}
        {/* Public / Private Toggle */}
        {!isPopup && (
          <div className="flex bg-[#262626] rounded-full p-1 border border-white/5 items-center">
            <button
              onClick={() => setViewMode('public')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${viewMode === 'public'
                ? 'bg-[#007AFF] text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-white'
                }`}
            >
              <Globe size={15} />
              <span>Public</span>
            </button>
            <button
              onClick={() => setViewMode('private')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${viewMode === 'private'
                ? 'bg-[#007AFF] text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-white'
                }`}
            >
              <ShieldCheck size={15} />
              <span>Private</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

