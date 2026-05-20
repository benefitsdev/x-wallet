import { useNavigate } from 'react-router-dom'
import { Pencil, Plus } from 'lucide-react'

interface Props {
  address: string
  label: string
  type?: 'created' | 'imported'
  onComplete?: () => void
}

export default function ConfirmationScreen({ address, label, onComplete }: Props) {
  const navigate = useNavigate()

  const handleComplete = () => {
    if (onComplete) {
      onComplete()
    } else {
      navigate('/')
    }
  }

  // Format address for display (e.g. 0x78c462...4b73A8B)
  const formatAddress = (addr: string) => {
    if (!addr || addr.length < 12) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-7)}`;
  }

  return (
    <div className="max-w-[400px] mx-auto bg-[#18181A] p-6 rounded-2xl flex flex-col items-center shadow-2xl border border-white/5">
      <div className="mt-4 mb-6 flex justify-center relative">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="36" r="32" stroke="#34C759" strokeWidth="6" strokeLinecap="round" strokeDasharray="140 200" strokeDashoffset="-20" transform="rotate(-90 36 36)" />
          <path d="M22 38L32 48L52 24" stroke="#34C759" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <h2 className="text-[22px] font-bold text-white mb-6">Added successfully</h2>
      
      <div className="w-full bg-[#2C2C2E] p-4 rounded-xl flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF9500] via-[#FF2D55] to-[#007AFF] flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent mix-blend-overlay"></div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold text-sm">{label}</span>
            <button className="text-[#007AFF] hover:text-[#005bb5] transition-colors">
              <Pencil size={14} />
            </button>
          </div>
          <p className="text-[#8E8E93] text-[13px] mt-0.5 truncate font-mono">
            {formatAddress(address)}
          </p>
        </div>
      </div>

      <button 
        onClick={handleComplete} 
        className="w-full bg-[#007AFF] text-white py-3.5 rounded-xl font-semibold mb-3 hover:bg-[#005bb5] transition-colors text-[15px]"
      >
        Complete
      </button>
      
      <button 
        className="text-[#007AFF] font-medium hover:text-[#005bb5] hover:bg-[#007AFF]/20 transition-colors flex items-center justify-center space-x-2 w-full bg-[#007AFF]/10 py-3 rounded-xl text-[13px]"
      >
        <Plus size={16} />
        <span>Add more accounts from this recovery phrase</span>
      </button>
    </div>
  )
}
