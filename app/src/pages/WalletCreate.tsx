import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearLoggedOut } from '@/lib/storage'
import { useWallet } from '@/hooks/useWallet'
import { createRandomWallet } from '@/lib/ethers'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function WalletCreate() {
  const navigate = useNavigate()
  const { createWallet, isLoading, error } = useWallet()
  const [label, setLabel] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    try {
      const wallet = createRandomWallet()
      const record = await createWallet(
        wallet.privateKey,
        wallet.mnemonic?.phrase || '',
        label,
        'created'
      )
      clearLoggedOut()
      navigate(`/receive/${record.id}`)
    } catch {
      // error is set via useWallet hook
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Generate a new Ethereum wallet
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Wallet Label (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Main Wallet"
          />

          {(localError || error) && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              {localError || error}
            </p>
          )}

          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <p className="text-xs text-warning">
              Your wallet will be saved locally on this device. Make sure to back up your seed phrase.
            </p>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Generate Wallet
          </Button>
        </form>
      </Card>
    </div>
  )
}
