import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { useWallet } from '@/hooks/useWallet'
import { isLoggedOut, clearLoggedOut } from '@/lib/storage'
import AppLayout from '@/components/layout/AppLayout'
import WalletOnboarding from '@/pages/WalletOnboarding'
import Dashboard from '@/pages/Dashboard'
import WalletCreate from '@/pages/WalletCreate'
import WalletImport from '@/pages/WalletImport'
import Send from '@/pages/Send'
import Receive from '@/pages/Receive'
import Transactions from '@/pages/Transactions'
import Settings from '@/pages/Settings'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminUsers from '@/pages/admin/AdminUsers'
import AdminSettings from '@/pages/admin/AdminSettings'

function HasWalletGuard({ children }: { children: React.ReactNode }) {
  const { wallets, fetchWallets } = useWallet()
  const [firstLoadDone, setFirstLoadDone] = useState(false)

  useEffect(() => {
    fetchWallets().finally(() => setFirstLoadDone(true))
  }, [fetchWallets])

  if (!firstLoadDone) {
    return (
          <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (isLoggedOut()) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="text-4xl">🔒</div>
          <h1 className="text-2xl font-bold text-foreground">Logged Out</h1>
          <p className="text-muted-foreground text-sm">
            Your wallets are stored securely on the network.
          </p>
          <Link
            to="/onboard"
            onClick={() => clearLoggedOut()}
            className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/onboard" element={<WalletOnboarding />} />
      <Route
        path="/"
        element={
          <HasWalletGuard>
            <AppLayout />
          </HasWalletGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="wallet/create" element={<WalletCreate />} />
        <Route path="wallet/import" element={<WalletImport />} />
        <Route path="send" element={<Send />} />
        <Route path="receive/:walletId" element={<Receive />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  )
}
