import { useState } from 'react'
import { isValidPrivateKey } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

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
  const [method, setMethod] = useState<ImportMethod>('key')
  const [value, setValue] = useState('')
  const [label, setLabel] = useState('')

  const trimmed = value.trim()
  const keyValid = method === 'key' && isValidPrivateKey(trimmed)
  const seedValid = method === 'seed' && isValidSeedPhrase(trimmed)
  const canSubmit = trimmed.length > 0 && (keyValid || seedValid)

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Import Wallet</h1>
        <p className="text-muted-foreground text-sm">
          Import an existing wallet using your private key or seed phrase
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={method === 'key' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => { setMethod('key'); setValue('') }}
        >
          Private Key
        </Button>
        <Button
          variant={method === 'seed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => { setMethod('seed'); setValue('') }}
        >
          Seed Phrase
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          label={method === 'key' ? 'Private Key' : 'Seed Phrase'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            method === 'key'
              ? '0x... or hex private key'
              : 'Enter your 12 or 24 word seed phrase'
          }
          error={
            trimmed.length > 0 && !keyValid && method === 'key'
              ? 'Invalid private key format (must be 64 hex chars)'
              : trimmed.length > 0 && !seedValid && method === 'seed'
              ? 'Invalid seed phrase (must be 12 or 24 words)'
              : undefined
          }
          required
        />

        <Input
          label="Wallet Label (optional)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Imported Wallet"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={() => onImport(trimmed, method)} disabled={!canSubmit} className="flex-1">
          Import
        </Button>
      </div>
    </div>
  )
}
