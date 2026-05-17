import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import BalanceCard from '@/components/wallet/BalanceCard'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export default function Dashboard() {
  const { wallets, balances, isLoading, error, fetchWallets, fetchBalances } = useWallet()

  useEffect(() => {
    fetchWallets()
  }, [fetchWallets])

  useEffect(() => {
    if (wallets.length > 0) {
      fetchBalances()
    }
  }, [wallets, fetchBalances])

  if (wallets.length === 0) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Your wallet overview</p>
        </div>
        <div className="flex gap-2">
          <Link to="/send" className="cursor-pointer">
            <Button size="sm">
              <ArrowUpRight size={16} />
              Send
            </Button>
          </Link>
          <Link to={`/receive/${wallets[0]?.id || ''}`} className="cursor-pointer">
            <Button size="sm" variant="secondary">
              <ArrowDownLeft size={16} />
              Receive
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</div>
      )}

      {isLoading && wallets.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full inline-block" />
          Loading balances...
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {balances.map((b) => (
          <BalanceCard key={b.wallet_id} balance={b} />
        ))}
      </div>

      {wallets.length > 0 && (
        <Card title="Your Wallets">
          <div className="space-y-3">
            {wallets.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{w.label}</p>
                  <p className="text-xs text-muted-foreground font-mono">{w.public_address}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
