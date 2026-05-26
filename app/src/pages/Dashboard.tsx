import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import { useViewMode } from '@/store/ViewModeContext'
import { QRCodeSVG } from 'qrcode.react'
import {
  //Key, 
  ChevronDown, Copy, Check, QrCode, X,
  //Menu,
  RefreshCw, Send, Shield, LayoutGrid, Search, ChevronRight, ArrowLeft
} from 'lucide-react'

export default function Dashboard() {
  const { wallets, fetchWallets, fetchBalances } = useWallet()
  const { viewMode, setViewMode } = useViewMode()
  const [activeTab, setActiveTab] = useState<'tokens' | 'nft' | 'defi' | 'activity'>('tokens')
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const [showAccounts, setShowAccounts] = useState(false)
  const accountsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountsRef.current && !accountsRef.current.contains(e.target as Node)) {
        setShowAccounts(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (wallets.length > 0) {
      fetchBalances()
    }
  }, [wallets, fetchBalances])

  if (wallets.length === 0) {
    return null
  }

  const wallet = wallets.find((w) => w.id === selectedWalletId) || wallets[0]
  const address = wallet?.public_address || '0xe51000000000000000000000000000000005278'
  const shortAddress = `${address.slice(0, 5)}...${address.slice(-4)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="relative w-full rounded-[24px] overflow-hidden bg-gradient-to-r from-[#1E25B0] via-[#0D41E1] to-[#1281FF] p-6 shadow-2xl h-[240px] flex flex-col justify-between">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            {/* Account Selector */}
            <div className="relative" ref={accountsRef}>
              <button
                onClick={() => setShowAccounts((prev) => !prev)}
                className="flex items-center space-x-2 bg-black/20 hover:bg-black/30 transition-colors rounded-xl px-3 py-1.5 backdrop-blur-md border border-white/10"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF9500] via-[#FF2D55] to-[#007AFF]"></div>
                <span className="text-white font-bold text-[15px] tracking-wide ml-1">{wallet?.label || 'Account 1'}</span>
                <ChevronDown size={16} className="text-white/80" />
              </button>

              {showAccounts && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#1C1C1E] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  {wallets.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setSelectedWalletId(w.id)
                        setShowAccounts(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors ${w.id === wallet?.id ? 'bg-white/5' : ''
                        }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF9500] via-[#FF2D55] to-[#007AFF] shrink-0"></div>
                      <div className="text-left">
                        <p className="text-white font-semibold text-[14px] leading-tight">{w.label}</p>
                        <p className="text-[#8E8E93] text-[12px] font-mono">{`${w.public_address.slice(0, 6)}...${w.public_address.slice(-4)}`}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center space-x-3">
              <span className="text-white/90 font-mono text-[14px]">({shortAddress})</span>
              <button onClick={handleCopy} className="text-white/70 hover:text-white transition-colors">
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
              <button onClick={() => setShowQr(true)} className="text-white/70 hover:text-white transition-colors"><QrCode size={16} /></button>
            </div>
          </div>


        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-white font-extrabold text-[44px] tracking-tight leading-none">$0<span className="text-[28px] text-white/80">.00</span></span>
            <button className="text-white/70 hover:text-white transition-colors"><RefreshCw size={18} /></button>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/send" className="flex flex-col items-center space-y-2 group">
              <div className="w-14 h-14 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors shadow-lg">
                <Send size={20} className="text-white" />
              </div>
              <span className="text-white/90 text-[13px] font-medium">Send</span>
            </Link>
            <button className="flex flex-col items-center space-y-2 group opacity-50 cursor-not-allowed">
              <div className="w-14 h-14 rounded-2xl bg-[#4B5563] border border-white/10 flex items-center justify-center shadow-lg mix-blend-luminosity">
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-white/90 text-[13px] font-medium">Shield</span>
            </button>
            <button className="flex flex-col items-center space-y-2 group cursor-not-allowed">
              <div className="w-14 h-14 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors shadow-lg">
                <LayoutGrid size={20} className="text-white" />
              </div>
              <span className="text-white/90 text-[13px] font-medium">Apps</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'private' ? (
        <>
          {/* Back Button */}
          <button
            onClick={() => setViewMode('public')}
            className="flex items-center space-x-2 text-[#8E8E93] hover:text-white transition-colors pt-2"
          >
            <ArrowLeft size={20} />
            <span className="text-[14px] font-semibold">Back to Public View</span>
          </button>

          {/* Infinite Skeleton Loader */}
          <div className="w-full mt-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3.5 rounded-xl items-center bg-[#1A1A1C]">
                <div className="col-span-6 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-[14px] bg-[#2A2A2D] animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-20 bg-[#2A2A2D] rounded animate-pulse" />
                    <div className="h-2.5 w-28 bg-[#2A2A2D] rounded animate-pulse" />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="h-3 w-16 bg-[#2A2A2D] rounded animate-pulse" />
                </div>
                <div className="col-span-3 flex justify-end">
                  <div className="h-3 w-14 bg-[#2A2A2D] rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Tabs and Controls */}
          <div className="flex items-center justify-between pt-2 overflow-scroll">
            <div className="flex bg-[#262626] rounded-full p-1 border border-white/5">
              <button
                onClick={() => setActiveTab('tokens')}
                className={`px-6 py-1.5 rounded-full text-[14px] font-semibold transition-colors ${activeTab === 'tokens'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-[#8E8E93] hover:text-white'
                  }`}
              >Tokens</button>
              <button
                onClick={() => setActiveTab('nft')}
                className={`px-6 py-1.5 rounded-full text-[14px] font-semibold transition-colors ${activeTab === 'nft'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-[#8E8E93] hover:text-white'
                  }`}
              >NFT</button>
              <button
                onClick={() => setActiveTab('defi')}
                className={`px-6 py-1.5 rounded-full text-[14px] font-semibold transition-colors ${activeTab === 'defi'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-[#8E8E93] hover:text-white'
                  }`}
              >DeFi</button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-1.5 rounded-full text-[14px] font-semibold transition-colors ${activeTab === 'activity'
                  ? 'bg-[#404040] text-white shadow-sm'
                  : 'text-[#8E8E93] hover:text-white'
                  }`}
              >Activity</button>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-6 bg-[#262626] border border-white/5 px-4 py-2 rounded-xl text-[14px] font-semibold text-[#8E8E93] hover:text-white transition-colors w-[170px]">
                <span>All Networks</span>
                <ChevronRight size={16} />
              </button>
              <button className="bg-[#262626] border border-white/5 p-2 rounded-xl text-[#007AFF] hover:bg-[#333333] transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {activeTab === 'tokens' ? (
            <>
              {/* Token List */}
              <div className="w-full mt-2">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[12px] font-bold text-[#8E8E93] tracking-wider">
                  <div className="col-span-6">ASSET/AMOUNT</div>
                  <div className="col-span-3">PRICE</div>
                  <div className="col-span-3 text-right">USD VALUE</div>
                </div>

                {/* List */}
                <div className="flex flex-col space-y-[2px]">
                  <TokenRow iconColor="from-blue-500 to-purple-500" name="0 PLS" network="on PulseChain" price="$0.0000073" value="$0.00" />
                  <TokenRow iconColor="from-indigo-600 to-purple-600" name="0 PCOCK" network="on PulseChain" price="$0.01" value="$0.00" active />
                  <TokenRow iconColor="from-pink-500 to-rose-500" name="0 WPLS" network="on PulseChain" price="$0.0000073" value="$0.00" />
                  <TokenRow iconColor="from-blue-400 to-blue-600" name="0 USDC" network="on PulseChain" price="$1.001" value="$0.00" isUsdc />
                </div>
              </div>

              {/* Add Custom Token */}
              <button className="w-full mt-6 py-4 rounded-xl border border-white/10 text-[#007AFF] text-[15px] font-semibold hover:bg-[#007AFF]/10 hover:border-[#007AFF]/50 transition-colors bg-[#18181A] cursor-not-allowed">
                + Add custom token
              </button>
            </>
          ) : (
            <>
              {/* Skeleton List Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 mt-2 text-[12px] font-bold text-[#8E8E93] tracking-wider">
                <div className="col-span-6">ASSET/AMOUNT</div>
                <div className="col-span-3">PRICE</div>
                <div className="col-span-3 text-right">USD VALUE</div>
              </div>

              {/* Skeleton Rows */}
              <div className="flex flex-col space-y-[2px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3.5 rounded-xl items-center bg-[#1A1A1C]">
                    <div className="col-span-6 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-[14px] bg-[#2A2A2D] animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-20 bg-[#2A2A2D] rounded animate-pulse" />
                        <div className="h-2.5 w-28 bg-[#2A2A2D] rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="h-3 w-16 bg-[#2A2A2D] rounded animate-pulse" />
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <div className="h-3 w-14 bg-[#2A2A2D] rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* QR Code Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowQr(false)}>
          <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold text-[18px]">Receive</h3>
              <button onClick={() => setShowQr(false)} className="text-[#8E8E93] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-xl inline-block">
              <QRCodeSVG value={address} size={200} level="M" fgColor="#0f172a" />
            </div>
            <p className="text-[#8E8E93] text-[13px] text-center mt-4 font-mono break-all">{address}</p>
          </div>
        </div>
      )}

    </div>
  )
}

function TokenRow({ iconColor, name, network, price, value, active = false, isUsdc = false }: any) {
  return (
    <div className={`grid grid-cols-12 gap-4 px-4 py-3.5 rounded-xl items-center cursor-pointer transition-colors ${active ? 'bg-[#182336] border border-[#007AFF]/20' : 'bg-[#1A1A1C] hover:bg-[#222224] border border-transparent'}`}>
      <div className="col-span-6 flex items-center space-x-3">
        <div className="relative">
          <div className={`w-10 h-10 rounded-[14px] bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-lg`}>
            {isUsdc ? <span className="text-white font-bold text-lg">$</span> : <span className="text-white font-black text-xs">~</span>}
          </div>
          <div className="absolute -top-1 -left-1 w-[18px] h-[18px] bg-[#1A1A1C] rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full"></div>
          </div>
        </div>
        <div>
          <p className="text-white font-bold text-[15px] leading-tight">{name}</p>
          <p className="text-[#8E8E93] text-[13px] mt-0.5">{network}</p>
        </div>
      </div>
      <div className="col-span-3 text-white text-[15px]">{price}</div>
      <div className="col-span-3 text-right text-white font-bold text-[15px]">{value}</div>
    </div>
  )
}
