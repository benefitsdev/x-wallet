import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearLoggedOut } from '@/lib/storage'
import { useWallet } from '@/hooks/useWallet'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

type ImportMethod = 'key' | 'seed'

export default function WalletImport() {
  const navigate = useNavigate()
  const { importWallet, isLoading, error } = useWallet()
  const [method, setMethod] = useState<ImportMethod>('key')
  const [keyOrPhrase, setKeyOrPhrase] = useState('')
  const [label, setLabel] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    if (!keyOrPhrase.trim()) {
      setLocalError('Please enter a private key or seed phrase')
      return
    }
    try {
      const record = await importWallet(keyOrPhrase.trim(), label, 'imported')
      clearLoggedOut()
      navigate(`/receive/${record.id}`)
    } catch {
      // error is set via useWallet hook
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Import Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Import an existing wallet using your private key or seed phrase
        </p>
      </div>

      <Card>
        <div className="flex gap-2 mb-4">
          <Button
            variant={method === 'key' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMethod('key')}
          >
            Private Key
          </Button>
          <Button
            variant={method === 'seed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setMethod('seed')}
          >
            Seed Phrase
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={method === 'key' ? 'Private Key' : 'Seed Phrase'}
            value={keyOrPhrase}
            onChange={(e) => setKeyOrPhrase(e.target.value)}
            placeholder={
              method === 'key'
                ? '0x... or hex private key'
                : 'Enter your 12 or 24 word seed phrase'
            }
            required
          />

          <Input
            label="Wallet Label (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Imported Wallet"
          />

          {(localError || error) && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              {localError || error}
            </p>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full">
            Import Wallet
          </Button>
        </form>
      </Card>
    </div>
  )
}
