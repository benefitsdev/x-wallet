import type { WalletRecord, Transaction } from '@/types'

const WALLETS_KEY = 'xw_wallets'
const LOGGED_OUT_KEY = 'xw_loggedOut'

export function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < 15; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

export function getWallets(): WalletRecord[] {
  try {
    const raw = localStorage.getItem(WALLETS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWallets(wallets: WalletRecord[]): void {
  localStorage.setItem(WALLETS_KEY, JSON.stringify(wallets))
}

export function addWallet(wallet: WalletRecord): void {
  const wallets = getWallets()
  wallets.unshift(wallet)
  saveWallets(wallets)
}

export function clearAll(): void {
  localStorage.removeItem(WALLETS_KEY)
  localStorage.removeItem(LOGGED_OUT_KEY)
}

export function isLoggedOut(): boolean {
  return localStorage.getItem(LOGGED_OUT_KEY) === 'true'
}

export function setLoggedOut(): void {
  localStorage.setItem(LOGGED_OUT_KEY, 'true')
}

export function clearLoggedOut(): void {
  localStorage.removeItem(LOGGED_OUT_KEY)
}
