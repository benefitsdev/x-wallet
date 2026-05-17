import { config } from '@/config'
import type { Balance } from '@/types'

interface BalanceCardProps {
  balance: Balance
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
      <p className="text-sm text-muted-foreground">{balance.label}</p>
      <p className="text-3xl font-bold text-foreground mt-2">
        {parseFloat(balance.balance).toLocaleString('en-US', {
          maximumFractionDigits: 6,
          minimumFractionDigits: 2,
        })}{' '}
        <span className="text-lg text-primary">{config.assetSymbol}</span>
      </p>
      <p className="text-xs text-muted-foreground font-mono mt-2 truncate">
        {balance.address}
      </p>
    </div>
  )
}
