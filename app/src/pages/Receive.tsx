import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import { config } from '@/config'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, Check } from 'lucide-react'

export default function Receive() {
  const { walletId } = useParams()
  const { wallets, fetchWallets, isLoading } = useWallet()
  const [copied, setCopied] = useState(false)

  const wallet = wallets.find((w) => w.id === walletId)

  useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  const handleCopy = async () => {
    if (!wallet) return
    await navigator.clipboard.writeText(wallet.public_address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto flex items-center justify-center py-12">
        <span className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!wallet) {
    return (
      <div className="max-w-lg mx-auto">
        <Card>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Wallet not found</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Receive {config.assetSymbol}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Share your wallet address to receive funds
        </p>
      </div>

      <Card>
        <div className="text-center space-y-6">
          <p className="text-sm text-muted-foreground">{wallet.label}</p>

          <div className="inline-flex p-4 bg-white rounded-xl">
            <QRCodeSVG
              value={wallet.public_address}
              size={200}
              level="M"
              fgColor="#0f172a"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono break-all bg-background rounded-lg p-3 border border-border">
              {wallet.public_address}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="w-full"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Address
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
