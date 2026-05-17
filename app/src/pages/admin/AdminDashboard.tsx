import { useEffect, useState } from 'react'
import { getWallets } from '@/lib/storage'
import Card from '@/components/ui/Card'
import { Wallet, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ wallets: 0, transactions: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const wallets = getWallets()
        setStats({
          wallets: wallets.length,
          transactions: 0,
        })
      } catch {
        // silently fail
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">System overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Wallet size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.wallets}</p>
              <p className="text-xs text-muted-foreground">Wallets</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Activity size={24} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.transactions}</p>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
