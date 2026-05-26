import { useEffect } from 'react'
import { useTransactions } from '@/hooks/useTransactions'
import { formatDate, formatAmount } from '@/lib/utils'
import { shortenAddress } from '@/lib/ethers'
import { config } from '@/config'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react'

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  confirmed: 'success',
  pending: 'warning',
  failed: 'danger',
}

export default function Transactions() {
  const { transactions, isLoading,
    // error, 
    fetchTransactions } = useTransactions()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View your past transactions
        </p>
      </div>

      {/* {error && (
        <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</div>
      )} */}

      {isLoading || transactions.length === 0 ? (
        <Card>
          <div className="space-y-3 p-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2D] animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-[#2A2A2D] rounded animate-pulse" />
                    <div className="h-2.5 w-32 bg-[#2A2A2D] rounded animate-pulse" />
                    <div className="h-2.5 w-16 bg-[#2A2A2D] rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-3 w-16 bg-[#2A2A2D] rounded animate-pulse ml-auto" />
                  <div className="h-5 w-14 bg-[#2A2A2D] rounded animate-pulse ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background border border-border hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'receive'
                      ? 'bg-success/10'
                      : 'bg-destructive/10'
                      }`}
                  >
                    {tx.type === 'receive' ? (
                      <ArrowDownLeft
                        size={18}
                        className="text-success"
                      />
                    ) : (
                      <ArrowUpRight size={18} className="text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {tx.type}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {tx.type === 'send'
                        ? `To: ${shortenAddress(tx.to_address)}`
                        : `From: ${shortenAddress(tx.from_address)}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <p
                    className={`text-sm font-medium ${tx.type === 'receive'
                      ? 'text-success'
                      : 'text-foreground'
                      }`}
                  >
                    {tx.type === 'receive' ? '+' : '-'}
                    {formatAmount(tx.amount, tx.asset_symbol)}
                  </p>
                  <Badge variant={statusVariant[tx.status] || 'default'}>
                    {tx.status}
                  </Badge>
                  {tx.tx_hash && (
                    <a
                      href={`${config.explorerUrl}/tx/${tx.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-primary hover:underline mt-1 justify-end cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
