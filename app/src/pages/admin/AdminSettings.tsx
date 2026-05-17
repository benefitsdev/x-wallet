import { config } from '@/config'
import Card from '@/components/ui/Card'

export default function AdminSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View current system configuration
        </p>
      </div>

      <Card title="Application">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">App Name</p>
            <p className="text-sm text-foreground">{config.appName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm text-foreground">{config.appDescription}</p>
          </div>
        </div>
      </Card>

      <Card title="Blockchain">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Asset</p>
            <p className="text-sm text-foreground">{config.assetName} ({config.assetSymbol})</p>
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

      <Card title="PocketBase">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Server URL</p>
            <p className="text-sm text-foreground font-mono">{config.pocketBaseUrl}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
