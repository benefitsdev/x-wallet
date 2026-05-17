import { config } from '@/config'
import { Menu, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="text-lg font-bold text-foreground cursor-pointer">
          {config.appName}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/settings"
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <Settings size={20} />
        </Link>
      </div>
    </header>
  )
}
