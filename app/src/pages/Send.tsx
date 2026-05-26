import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import { Copy, Info, ChevronLeft, Layers } from 'lucide-react'

export default function Send() {
  const navigate = useNavigate()
  const { wallets, fetchWallets } = useWallet()

  useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  const wallet = wallets[0]
  const address = wallet?.public_address || '0xe51000000000000000000000000000000005278'
  const shortAddress = `${address.slice(0, 9)}...${address.slice(-8)}`

  return (
    <div className="flex flex-col absolute inset-0 bg-[#323232] text-white font-sans overflow-hidden">
      {/* Custom Header */}
      <div className="flex items-center justify-between px-8 py-6 z-10">
        <div className="flex items-center space-x-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF9500] via-[#FF2D55] to-[#007AFF] shadow-md"></div>
          <div>
            <p className="font-bold text-[16px] tracking-wide">{wallet?.label || 'Account 1'}</p>
            <div className="flex items-center text-[#8E8E93] text-[13px] mt-0.5 space-x-2">
              <span className="font-mono tracking-wider">{shortAddress}</span>
              <button className="hover:text-white transition-colors opacity-70 hover:opacity-100"><Copy size={14} /></button>
            </div>
          </div>
        </div>
        <div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-[10px] flex items-center justify-center shadow-lg relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[10px]"></div>
            <span className="text-white font-extrabold text-[18px] shadow-sm relative z-10 leading-none">X</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-[10vh] px-4 z-10 relative">
        <div className="w-full max-w-[540px] bg-[#111111] rounded-[12px] p-8 shadow-2xl border border-white/5">
          <h2 className="text-center font-bold text-[22px] mb-8 text-white tracking-wide">Send</h2>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="h-3.5 w-24 bg-[#2A2A2D] rounded animate-pulse" />
              <div className="h-[52px] w-full bg-[#2A2A2D] rounded-[8px] animate-pulse" />
            </div>
            <div className="space-y-3 pb-2">
              <div className="h-3.5 w-20 bg-[#2A2A2D] rounded animate-pulse" />
              <div className="w-full h-[140px] bg-[#2A2A2D] rounded-[8px] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full h-[85px] bg-[#111A2B] border-t border-[#1C2A44] flex items-center justify-between px-8 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-[#007AFF] border border-[#007AFF] px-7 py-2.5 rounded-[8px] hover:bg-[#007AFF]/10 transition-colors font-medium text-[15px]"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-3 text-[#007AFF] border border-[#007AFF]/30 px-6 py-2.5 rounded-[8px] hover:bg-[#007AFF]/10 transition-colors font-medium text-[15px] cursor-not-allowed">
            <span>Start a batch</span>
            <Layers size={18} strokeWidth={2} />
          </button>

          <button className="text-[#8E8E93] hover:text-white transition-colors cursor-not-allowed">
            <Info size={22} />
          </button>

          <button className="bg-[#007AFF] text-white px-10 py-2.5 rounded-[8px] font-semibold hover:bg-[#005bb5] transition-colors text-[15px] shadow-[0_0_15px_rgba(0,122,255,0.4)] cursor-not-allowed">
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}
