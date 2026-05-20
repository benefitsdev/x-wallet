import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isSendPage = location.pathname === '/send'

  return (
    <div className={`min-h-screen ${isSendPage ? 'bg-[#262626]' : 'bg-[#0B0B0D]'} text-white flex flex-col relative`}>
      {!isSendPage && <Header onMenuClick={() => setSidebarOpen(true)} />}
      
      {/* Sidebar hidden by default on desktop too, only overlay if open */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 w-full overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
