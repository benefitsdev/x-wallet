import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  Send,
  Download,
  History,
  Shield,
  LogOut,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { config } from '@/config'
import { clearAll, setLoggedOut } from '@/lib/storage'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/wallet/create', icon: Wallet, label: 'Create Wallet' },
  { to: '/wallet/import', icon: Download, label: 'Import Wallet' },
  { to: '/send', icon: Send, label: 'Send' },
  { to: '/transactions', icon: History, label: 'Transactions' },
]

const adminItems = [
  { to: '/admin', icon: Shield, label: 'Admin' },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAll()
    setLoggedOut()
    navigate('/onboard', { replace: true })
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <span className="text-lg font-bold text-foreground">{config.appName}</span>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 h-[100vh]">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          <div className="border-t border-border my-3" />
          <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Admin
          </p>
          {adminItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          <div className="border-t border-border my-3" />
          <button
            onClick={() => {
              handleLogout()
              onClose()
            }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
