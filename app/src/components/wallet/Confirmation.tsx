import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Toast from '@/components/ui/Toast'
interface Props {
  address: string
  label: string
  type: 'created' | 'imported'
}

export default function Confirmation({ address, label, type }: Props) {
  const navigate = useNavigate()
  const [toastVisible, setToastVisible] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address)
    setToastVisible(true)
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card>
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Check size={32} className="text-success" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              {type === 'created' ? 'Wallet Created!' : 'Wallet Imported!'}
            </h2>
            <p className="text-sm text-muted-foreground">
              Your wallet is ready to use
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Label</p>
            <p className="text-sm text-foreground font-medium">{label}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Address</p>
            <p className="text-sm text-foreground font-mono break-all bg-background rounded-lg p-3 border border-border">
              {address}
            </p>
          </div>

          <Button variant="secondary" onClick={handleCopy} className="w-full">
            <Copy size={16} />
            Copy Address
          </Button>
        </div>
      </Card>

      <Button onClick={() => navigate('/')} className="w-full">
        Go to Dashboard
      </Button>

      <Toast message="Copied to clipboard!" isVisible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  )
}
