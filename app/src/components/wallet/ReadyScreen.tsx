import { useNavigate } from 'react-router-dom'
import { Puzzle, Pin } from 'lucide-react'

const confetti = [
  { top: '8%', left: '22%', delay: '0s', size: '8px', color: '#5222D0', rotate: '0deg' },
  { top: '12%', left: '78%', delay: '0.3s', size: '10px', color: '#EC615B', rotate: '30deg' },
  { top: '30%', left: '8%', delay: '0.6s', size: '7px', color: '#EC615B', rotate: '60deg' },
  { top: '25%', left: '88%', delay: '0.15s', size: '9px', color: '#5222D0', rotate: '90deg' },
  { top: '70%', left: '6%', delay: '0.45s', size: '8px', color: '#5222D0', rotate: '120deg' },
  { top: '75%', left: '90%', delay: '0.75s', size: '10px', color: '#EC615B', rotate: '150deg' },
  { top: '90%', left: '35%', delay: '0.2s', size: '7px', color: '#EC615B', rotate: '180deg' },
  { top: '92%', left: '65%', delay: '0.5s', size: '8px', color: '#5222D0', rotate: '210deg' },
  { top: '50%', left: '2%', delay: '0.7s', size: '6px', color: '#5222D0', rotate: '240deg' },
  { top: '48%', left: '96%', delay: '0.1s', size: '7px', color: '#EC615B', rotate: '270deg' },
  { top: '5%', left: '50%', delay: '0.55s', size: '6px', color: '#EC615B', rotate: '300deg' },
  { top: '95%', left: '50%', delay: '0.35s', size: '8px', color: '#5222D0', rotate: '330deg' },
]

export default function ReadyScreen() {
  const navigate = useNavigate()

  return (
    <>
      {/* Top right tooltip */}
      <div className="fixed top-6 right-6 bg-[#18181A] text-white p-4 rounded-xl flex items-center shadow-2xl border border-white/5 animate-in fade-in slide-in-from-top-4 duration-500 z-50">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
          <img src="/logo.png" alt="ZKX Wallet" className="w-12 h-12" />
        </div>
        <div>
          <p className="font-bold text-[15px]">Pin the ZKX Wallet extension</p>
          <p className="text-[13px] text-[#8E8E93] flex items-center mt-1">
            click <Puzzle size={14} className="mx-1" /> and then <Pin size={14} className="mx-1" />
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-[380px] w-full mx-auto bg-[#131314] px-6 py-10 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center relative w-full pt-8">
          {/* Confetti particles */}
          <div className="absolute w-[400px] h-[200px] pointer-events-none self-center">
            {confetti.map((p, i) => (
              <div
                key={i}
                className="absolute animate-sparkle"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  animationDelay: p.delay,
                  transform: `rotate(${p.rotate})`,
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <div className="w-[125px] h-[155px]   flex items-center justify-center z-10">
            <img src="/logo.png" alt="ZKX Wallet" className="w-[160px] h-[145px] " />
          </div>
        </div>

        <div className="text-white text-[20px] font-semibold mt-6 mb-4 text-center z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ZKX Wallet is ready to use
        </div>

        <div className="text-[#A6A6A7] text-[16px] leading-[21px] text-center mb-8 z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
          You can access your accounts from the dashboard via the extension icon.
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#007AFF] text-white rounded-xl font-semibold h-[56px] text-[15px] hover:bg-[#005bb5] transition-colors z-10"
        >
          Open wallet
        </button>
      </div>
    </>
  )
}
