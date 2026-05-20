import { Binoculars } from 'lucide-react'

interface Props {
  onCreate: () => void
  onImport: () => void
}

export default function OnboardingLanding({ onCreate, onImport }: Props) {
  return (
    <div className="fixed inset-0 bg-[#282828] flex items-center justify-center font-sans z-50">
      <div className="fixed top-6 right-6">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
      </div>

      <div className="bg-[#111111] rounded-2xl p-8 w-[90%] max-w-[420px] flex flex-col items-center shadow-2xl">
        <img src="/logo.png" alt="XWallet" className="w-[100px] h-[100px] mb-6" />

        <h1 className="text-[#A0A0A0] text-center text-[15px] mb-8 leading-relaxed font-medium px-4">
          The Web3 wallet that makes self-custody<br/>easy and secure.
        </h1>

        <button
          onClick={onCreate}
          className="w-full bg-[#1880ff] hover:bg-[#156DEC] text-white font-medium py-3.5 rounded-lg mb-4 transition-colors text-[15px]"
        >
          Create new account
        </button>

        <button
          onClick={onImport}
          className="w-full bg-transparent border border-[#333] hover:border-[#444] text-[#1880ff] font-medium py-3.5 rounded-lg mb-8 transition-colors text-[15px]"
        >
          Import existing account
        </button>

        <button className="flex items-center justify-center gap-2 text-[#1880ff] text-[15px] font-medium hover:opacity-80 mb-6">
          Watch an address
          <Binoculars size={18} />
        </button>

        <button className="text-[#1880ff] text-[13px] hover:opacity-80 underline underline-offset-4 decoration-1 opacity-90">
          Network Configuration
        </button>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-8 h-[6px] border-[1.5px] border-[#555] rounded-full"></div>
    </div>
  )
}
