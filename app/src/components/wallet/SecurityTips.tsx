import { useState } from 'react'
import { ChevronLeft, Check } from 'lucide-react'

interface Props {
  onNext: () => void
  onBack: () => void
}

export default function SecurityTips({ onNext, onBack }: Props) {
  const [checked, setChecked] = useState([false, false, false])

  const toggleCheck = (index: number) => {
    const newChecked = [...checked]
    newChecked[index] = !newChecked[index]
    setChecked(newChecked)
  }

  const isAllChecked = checked.every(Boolean)

  return (
    <div className="fixed inset-0 bg-[#282828] flex items-center justify-center font-sans z-50">
      {/* Top right logo */}
      <div className="fixed top-6 right-6">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] rounded-2xl w-[90%] max-w-[420px] flex flex-col shadow-2xl overflow-hidden">
        {/* Progress bar at the very top */}
        <div className="w-full h-1 bg-[#1A1A1A] flex">
          <div className="h-full bg-[#1CD172] w-1/2 rounded-r-full"></div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="text-[#A0A0A0] hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-white text-lg font-semibold">
              Create new recovery phrase
            </h1>
          </div>

          <p className="text-[#A0A0A0] text-[15px] mb-6">
            Before you begin, check these security tips.
          </p>

          <div className="space-y-3 mb-8">
            {[
              "Your recovery phrase is private. Keep it safe and never share it.",
              "If your recovery phrase is at risk, so is your account.",
              "Use your recovery phrase only to access or recover your wallet."
            ].map((text, idx) => (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="w-full text-left bg-[#1E1E1E] hover:bg-[#252525] transition-colors rounded-xl p-4 flex items-start gap-4"
              >
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors border ${checked[idx] ? 'bg-[#1880ff] border-[#1880ff]' : 'border-[#555] bg-transparent'}`}>
                  {checked[idx] && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-[#D0D0D0] text-[14px] leading-snug">
                  {text}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={!isAllChecked}
            className={`w-full py-3.5 rounded-lg font-medium text-[15px] transition-colors ${
              isAllChecked
                ? 'bg-[#1880ff] hover:bg-[#156DEC] text-white'
                : 'bg-[#154b9a] text-[#709bd6] cursor-not-allowed'
            }`}
          >
            Create recovery phrase
          </button>
        </div>
      </div>

      {/* Bottom handle */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-8 h-[6px] border-[1.5px] border-[#555] rounded-full"></div>
    </div>
  )
}
