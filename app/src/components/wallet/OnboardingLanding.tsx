import { config } from '@/config'
import { Wallet, Download } from 'lucide-react'

interface Props {
  onCreate: () => void
  onImport: () => void
}

export default function OnboardingLanding({ onCreate, onImport }: Props) {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome to {config.appName}</h1>
        <p className="text-muted-foreground">Get started by creating a new wallet or importing an existing one</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 max-w-xl mx-auto">
        <button
          onClick={onCreate}
          className="flex flex-col items-center gap-4 p-8 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all group text-left cursor-pointer"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Wallet size={32} className="text-primary" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Create New Wallet</h2>
            <p className="text-sm text-muted-foreground">Generate a new Ethereum wallet with a secure seed phrase</p>
          </div>
        </button>

        <button
          onClick={onImport}
          className="flex flex-col items-center gap-4 p-8 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all group text-left cursor-pointer"
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <Download size={32} className="text-accent" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Import Wallet</h2>
            <p className="text-sm text-muted-foreground">Import an existing wallet using your private key or seed phrase</p>
          </div>
        </button>
      </div>
    </div>
  )
}
