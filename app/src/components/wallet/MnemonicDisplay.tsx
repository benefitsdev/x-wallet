import { useState } from 'react'
import { ChevronLeft, Copy } from 'lucide-react'

interface Props {
  mnemonic: string
  onConfirm: () => void
  onBack: () => void
}

export default function MnemonicDisplay({ mnemonic, onConfirm, onBack }: Props) {
  const [copied, setCopied] = useState(false)
  const words = mnemonic.split(' ')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mnemonic)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
          <div className="h-full bg-[#1CD172] w-[45%] rounded-r-full"></div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onBack} className="text-[#A0A0A0] hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-white text-lg font-semibold">
              Back up recovery phrase
            </h1>
          </div>

          <p className="text-[#A0A0A0] text-[15px] mb-8 text-center max-w-[280px] mx-auto leading-snug">
            Write down and secure the recovery phrase for your account.
          </p>

          <div className="grid grid-cols-3 gap-[1px] bg-[#333] border border-[#333] rounded-lg overflow-hidden mb-6">
            {words.map((word, i) => (
              <div
                key={i}
                className="bg-[#111111] p-2 flex flex-col items-center justify-center relative h-[60px]"
              >
                <span className="absolute top-1.5 left-2 text-[#777] text-[11px]">{i + 1}.</span>
                <span className="text-white text-[14px] font-medium mt-1">{word}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-[#1880ff] text-[14px] font-medium hover:opacity-80 transition-opacity"
            >
              {copied ? 'Copied!' : 'Copy recovery phrase'}
              <Copy size={16} />
            </button>
          </div>

          <button
            onClick={onConfirm}
            className="w-full py-3.5 rounded-lg font-medium text-[15px] transition-colors bg-[#1880ff] hover:bg-[#156DEC] text-white"
          >
            I've saved the phrase
          </button>
        </div>
      </div>

      {/* Bottom handle */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-8 h-[6px] border-[1.5px] border-[#555] rounded-full"></div>
    </div>
  )
}
