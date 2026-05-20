import { useState } from 'react'
import { ChevronLeft, ChevronRight, Key, MoreHorizontal, Lock, Scan, ArrowDownRight, Check } from 'lucide-react'
import { isValidPrivateKey } from '@/lib/utils'

type ImportMethod = 'key' | 'seed'

interface Props {
  onImport: (keyOrPhrase: string, method: ImportMethod) => void
  onBack: () => void
}

function isValidSeedPhrase(phrase: string): boolean {
  const words = phrase.trim().split(/\s+/)
  return (words.length === 12 || words.length === 24) && words.every((w) => w.length > 0)
}

export default function WalletImporter({ onImport, onBack }: Props) {
  const [screen, setScreen] = useState<'select' | 'seed' | 'key'>('select')
  const [value, setValue] = useState('')
  const [keyChecked, setKeyChecked] = useState(false)
  const [advancedMode, setAdvancedMode] = useState(false)

  const trimmed = value.trim()
  const keyValid = screen === 'key' && isValidPrivateKey(trimmed)
  const seedValid = screen === 'seed' && isValidSeedPhrase(trimmed)
  
  const canSubmitSeed = trimmed.length > 0 && seedValid
  const canSubmitKey = trimmed.length > 0 && keyValid && keyChecked

  const handleSelect = (s: 'seed' | 'key') => {
    setScreen(s)
    setValue('')
    setKeyChecked(false)
  }

  const renderSelect = () => (
    <div className="bg-[#111111] rounded-2xl w-[90%] max-w-[420px] flex flex-col shadow-2xl overflow-hidden p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="text-[#A0A0A0] hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-white text-lg font-semibold flex-1 text-center pr-8">
          Select import method
        </h1>
      </div>

      <div className="space-y-3 mb-8">
        <button
          onClick={() => handleSelect('key')}
          className="w-full flex items-center justify-between bg-[#121A26] hover:bg-[#1A2635] transition-colors rounded-xl p-4"
        >
          <div className="flex items-center gap-4 text-white">
            <Key size={20} className="text-[#A0A0A0]" />
            <span className="text-[15px] font-medium">Private key</span>
          </div>
          <ChevronRight size={20} className="text-[#A0A0A0]" />
        </button>

        <button
          onClick={() => handleSelect('seed')}
          className="w-full flex items-center justify-between bg-[#121A26] hover:bg-[#1A2635] transition-colors rounded-xl p-4"
        >
          <div className="flex items-center gap-4 text-white">
            <MoreHorizontal size={20} className="text-[#A0A0A0]" />
            <span className="text-[15px] font-medium">Recovery phrase</span>
          </div>
          <ChevronRight size={20} className="text-[#A0A0A0]" />
        </button>

        <button
          className="w-full flex items-center justify-between bg-[#121A26] hover:bg-[#1A2635] transition-colors rounded-xl p-4 opacity-80"
        >
          <div className="flex items-center gap-4 text-white">
            <Lock size={20} className="text-[#A0A0A0]" />
            <span className="text-[15px] font-medium">Trezor</span>
          </div>
          <ChevronRight size={20} className="text-[#A0A0A0]" />
        </button>

        <button
          className="w-full flex items-center justify-between bg-[#121A26] hover:bg-[#1A2635] transition-colors rounded-xl p-4 opacity-80"
        >
          <div className="flex items-center gap-4 text-white">
            <Scan size={20} className="text-[#A0A0A0]" />
            <span className="text-[15px] font-medium">Ledger</span>
          </div>
          <ChevronRight size={20} className="text-[#A0A0A0]" />
        </button>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-1 text-[#1880ff] text-[14px] hover:opacity-80 font-medium">
          More <ArrowDownRight size={16} />
        </button>
      </div>
    </div>
  )

  const renderSeed = () => (
    <div className="bg-[#111111] rounded-2xl w-[90%] max-w-[420px] flex flex-col shadow-2xl overflow-hidden">
      <div className="w-full h-1 bg-[#1A1A1A] flex">
        <div className="h-full bg-[#1CD172] w-[45%] rounded-r-full"></div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setScreen('select')} className="text-[#A0A0A0] hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-semibold flex-1 text-center pr-8">
            Import recovery phrase
          </h1>
        </div>

        <div className="mb-6">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write or paste your recovery phrase"
            className="w-full bg-transparent border border-[#1880ff] rounded-lg p-4 text-white placeholder-[#777] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#1880ff] min-h-[120px] resize-none"
          />
        </div>

        <div className="flex items-center gap-3 mb-8 cursor-pointer w-fit" onClick={() => setAdvancedMode(!advancedMode)}>
          <div className={`w-9 h-[22px] rounded-full relative transition-colors ${advancedMode ? 'bg-[#1880ff]' : 'bg-[#333]'}`}>
            <div className={`w-[18px] h-[18px] rounded-full bg-[#111] absolute top-[2px] transition-all ${advancedMode ? 'left-[16px]' : 'left-[2px]'}`}></div>
          </div>
          <span className="text-[#A0A0A0] text-[14px]">Advanced mode</span>
        </div>

        <button
          onClick={() => onImport(trimmed, 'seed')}
          disabled={!canSubmitSeed}
          className={`w-full py-3.5 rounded-lg font-medium text-[15px] transition-colors ${
            canSubmitSeed
              ? 'bg-[#1880ff] hover:bg-[#156DEC] text-white'
              : 'bg-[#154b9a] text-[#709bd6] cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  )

  const renderKey = () => (
    <div className="bg-[#111111] rounded-2xl w-[90%] max-w-[420px] flex flex-col shadow-2xl overflow-hidden">
      <div className="w-full h-1 bg-[#1A1A1A] flex">
        <div className="h-full bg-[#1CD172] w-[45%] rounded-r-full"></div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setScreen('select')} className="text-[#A0A0A0] hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-semibold flex-1 text-center pr-8">
            Import private key
          </h1>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Input private key"
            className="w-full bg-transparent border border-[#333] rounded-lg p-4 text-white placeholder-[#777] text-[15px] focus:outline-none focus:border-[#555]"
          />
        </div>

        <button
          onClick={() => setKeyChecked(!keyChecked)}
          className="flex items-start gap-3 w-full text-left mb-8 group"
        >
          <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors border ${keyChecked ? 'bg-[#1880ff] border-[#1880ff]' : 'border-[#555] bg-transparent group-hover:border-[#777]'}`}>
            {keyChecked && <Check size={14} className="text-white" strokeWidth={3} />}
          </div>
          <span className="text-[#A0A0A0] text-[14px] leading-snug">
            I know I must keep a secure backup of my key.
          </span>
        </button>

        <button
          onClick={() => onImport(trimmed, 'key')}
          disabled={!canSubmitKey}
          className={`w-full py-3.5 rounded-lg font-medium text-[15px] transition-colors ${
            canSubmitKey
              ? 'bg-[#1880ff] hover:bg-[#156DEC] text-white'
              : 'bg-[#154b9a] text-[#709bd6] cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-[#282828] flex items-center justify-center font-sans z-50">
      <div className="fixed top-6 right-6">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      </div>

      {screen === 'select' && renderSelect()}
      {screen === 'seed' && renderSeed()}
      {screen === 'key' && renderKey()}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-8 h-[6px] border-[1.5px] border-[#555] rounded-full"></div>
    </div>
  )
}
