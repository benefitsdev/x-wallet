import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import { useTransactions } from '@/hooks/useTransactions'
import { isValidAddress, formatAmount } from '@/lib/utils'
import { getBalance, formatEth } from '@/lib/ethers'
import { config } from '@/config'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function Send() {
  const navigate = useNavigate()
  const { wallets, fetchWallets } = useWallet()
  const { sendTransaction, isLoading: isSending, error: txError } = useTransactions()

  const [selectedWalletId, setSelectedWalletId] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [localError, setLocalError] = useState('')
  const [balance, setBalance] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  useEffect(() => {
    if (selectedWalletId && wallets.length > 0) {
      const wallet = wallets.find((w) => w.id === selectedWalletId)
      if (wallet) {
        getBalance(wallet.public_address).then((wei) => {
          setBalance(formatEth(wei))
        })
      }
    }
  }, [selectedWalletId, wallets])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    setSuccess(false)

    if (!selectedWalletId) {
      setLocalError('Please select a wallet')
      return
    }
    if (!isValidAddress(toAddress)) {
      setLocalError('Invalid recipient address')
      return
    }
    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Invalid amount')
      return
    }
    if (parseFloat(amount) > parseFloat(balance || '0')) {
      setLocalError('Insufficient balance')
      return
    }

    try {
      const wallet = wallets.find((w) => w.id === selectedWalletId)
      if (!wallet) return
      await sendTransaction(wallet, toAddress, amount)
      setSuccess(true)
      setAmount('')
      setToAddress('')
    } catch {
      // error set via hook
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <Card>
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-success text-2xl">✓</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Transaction Sent!</h2>
            <p className="text-muted-foreground text-sm">
              Your transaction has been broadcast to the network.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setSuccess(false)}>Send Another</Button>
              <Button variant="secondary" onClick={() => navigate('/transactions')}>
                View History
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Send {config.assetSymbol}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Transfer funds to another wallet
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted-foreground font-medium">From Wallet</label>
            <select
              value={selectedWalletId}
              onChange={(e) => setSelectedWalletId(e.target.value)}
              className="h-10 px-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select a wallet</option>
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.label}
                </option>
              ))}
            </select>
            {balance && (
              <span className="text-xs text-muted-foreground">
                Balance: {formatAmount(balance, config.assetSymbol)}
              </span>
            )}
          </div>

          <Input
            label="Recipient Address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="0x..."
            required
          />

          <Input
            label="Amount"
            type="number"
            step="0.000001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`0.00 ${config.assetSymbol}`}
            required
          />

          {(localError || txError) && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              {localError || txError}
            </p>
          )}

          <Button type="submit" isLoading={isSending} className="w-full">
            Send {config.assetSymbol}
          </Button>
        </form>
      </Card>
    </div>
  )
}
