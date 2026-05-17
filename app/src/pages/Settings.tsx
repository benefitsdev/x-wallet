import { config } from '@/config'
import Card from '@/components/ui/Card'

export default function Settings() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Network configuration</p>
      </div>

      <Card title="Network">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Network</p>
            <p className="text-sm text-foreground">{config.assetName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Chain ID</p>
            <p className="text-sm text-foreground font-mono">{config.chainId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">RPC URL</p>
            <p className="text-sm text-foreground font-mono break-all">{config.rpcUrl}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Explorer</p>
            <p className="text-sm text-foreground font-mono">{config.explorerUrl}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
