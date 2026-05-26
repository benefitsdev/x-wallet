import { useNavigate } from 'react-router-dom'
import { Pencil, Plus } from 'lucide-react'

interface Props {
  address: string
  label: string
  type?: 'created' | 'imported'
  onComplete?: () => void
}

const sparkles = [
  { top: '10%', left: '50%', delay: '0s', size: '4px', color: '#70FF8D' },
  { top: '28%', left: '14%', delay: '0.25s', size: '5px', color: '#AC77FF' },
  { top: '68%', left: '8%', delay: '0.5s', size: '4px', color: '#FFC829' },
  { top: '90%', left: '38%', delay: '0.75s', size: '6px', color: '#70FF8D' },
  { top: '86%', left: '76%', delay: '0.35s', size: '4px', color: '#6000FF' },
  { top: '48%', left: '96%', delay: '0.6s', size: '5px', color: '#AC77FF' },
  { top: '12%', left: '82%', delay: '0.15s', size: '4px', color: '#FFC829' },
  { top: '4%', left: '22%', delay: '0.45s', size: '5px', color: '#6000FF' },
]

export default function ConfirmationScreen({ address, label, onComplete }: Props) {
  const navigate = useNavigate()

  const handleComplete = () => {
    if (onComplete) {
      onComplete()
    } else {
      navigate('/')
    }
  }

  const formatAddress = (addr: string) => {
    if (!addr || addr.length < 12) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-7)}`;
  }

  return (
    <>
      <div className="fixed top-6 right-6">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      </div>
      <div className="max-w-[400px] mx-auto bg-[#18181A] p-6 rounded-2xl flex flex-col items-center shadow-2xl border border-white/5">
      <div className="mt-4 mb-6 flex justify-center relative w-[200px] h-[140px]">
        {sparkles.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-sparkle"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              animationDelay: dot.delay,
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path fill="#70FF8D" d="m18.88 25.925-4.48 4.48 14.4 14.4 32-32-4.475-4.48L28.8 35.68Zm38.72 6.08a25.491 25.491 0 1 1-18.559-24.64L44 2.405a29.766 29.766 0 0 0-12-2.4 32 32 0 1 0 32 32Z"/>
          </svg>
        </div>
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
        className="w-full bg-[#007AFF] text-white py-3.5 h-[56px] rounded-xl font-semibold mb-3 hover:bg-[#005bb5] transition-colors text-[15px]"
      >
        Complete
      </button>
      
      <button 
        className="text-[#007AFF] font-medium hover:text-[#005bb5] hover:bg-[#007AFF]/20 transition-colors flex items-center justify-center space-x-2 w-full bg-[#007AFF]/10 py-3 h-[56px] rounded-xl text-[13px]"
      >
        <Plus size={16} />
        <span>Add more accounts from this recovery phrase</span>
      </button>
      </div>
    </>
  )
}
