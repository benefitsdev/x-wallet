import { useState } from 'react'
import { Copy } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'

interface Props {
  mnemonic: string
  onConfirm: () => void
  onBack: () => void
}

export default function MnemonicDisplay({ mnemonic, onConfirm, onBack }: Props) {
  const [confirmed, setConfirmed] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const words = mnemonic.split(' ')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mnemonic)
    setToastVisible(true)
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Your Seed Phrase</h1>
        <p className="text-muted-foreground text-sm">
          Write down these 12 words in order. Never share them with anyone.
        </p>
      </div>

      <div className="bg-background border border-border rounded-xl p-4">
        <div className="grid grid-cols-3 gap-2">
          {words.map((word, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card text-sm"
            >
              <span className="text-muted-foreground text-xs w-5 text-right">{i + 1}.</span>
              <span className="text-foreground font-mono font-medium">{word}</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant="secondary" onClick={handleCopy} className="w-full">
        <Copy size={16} />
        Copy to Clipboard
      </Button>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border bg-card text-primary focus:ring-ring"
        />
        <span className="text-sm text-muted-foreground">
          I have saved my seed phrase in a secure location. I understand that if I lose it, my wallet cannot be recovered.
        </span>
      </label>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onConfirm} disabled={!confirmed} className="flex-1">
          Continue
        </Button>
      </div>

      <Toast message="Copied to clipboard!" isVisible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  )
}
