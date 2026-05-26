import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { ViewModeProvider } from '@/store/ViewModeContext'

const isPopup = typeof chrome !== 'undefined' && !!chrome.runtime?.id && window.location.pathname.includes('popup.html')

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isSendPage = location.pathname === '/send'

  const containerClasses = isPopup
    ? 'w-[400px] h-[600px] overflow-hidden'
    : 'min-h-screen'

  return (
    <div className={`${containerClasses} ${isSendPage ? 'bg-[#262626]' : 'bg-[#0B0B0D]'} text-white flex flex-col relative`}>
      <ViewModeProvider>
      {!isSendPage && <Header onMenuClick={() => setSidebarOpen(true)} />}
      <div className='flex flex row'>
        {/* Sidebar hidden by default on desktop too, only overlay if open */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 w-full overflow-auto">
          <Outlet />
        </main>
      </div>
      </ViewModeProvider>
    </div>
  )
}

