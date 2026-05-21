import type { WalletRecord } from '@/types'

const WALLETS_KEY = 'xw_wallets'
const LOGGED_OUT_KEY = 'xw_loggedOut'

const isExtension = typeof chrome !== 'undefined' && !!chrome.storage?.local

async function getItem(key: string): Promise<string | null> {
  if (isExtension) {
    const result = await chrome.storage.local.get(key)
    return (result[key] as string) ?? null
  }
  return localStorage.getItem(key)
}

async function setItem(key: string, value: string): Promise<void> {
  if (isExtension) {
    await chrome.storage.local.set({ [key]: value })
  } else {
    localStorage.setItem(key, value)
  }
}

async function removeItem(key: string): Promise<void> {
  if (isExtension) {
    await chrome.storage.local.remove(key)
  } else {
    localStorage.removeItem(key)
  }
}

export function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < 15; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

export async function getWallets(): Promise<WalletRecord[]> {
  try {
    const raw = await getItem(WALLETS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

async function saveWallets(wallets: WalletRecord[]): Promise<void> {
  await setItem(WALLETS_KEY, JSON.stringify(wallets))
}

export async function addWallet(wallet: WalletRecord): Promise<void> {
  const wallets = await getWallets()
  wallets.unshift(wallet)
  await saveWallets(wallets)
}

export async function clearAll(): Promise<void> {
  await removeItem(WALLETS_KEY)
  await removeItem(LOGGED_OUT_KEY)
}

export async function isLoggedOut(): Promise<boolean> {
  const val = await getItem(LOGGED_OUT_KEY)
  return val === 'true'
}

export async function setLoggedOut(): Promise<void> {
  await setItem(LOGGED_OUT_KEY, 'true')
}

export async function clearLoggedOut(): Promise<void> {
  await removeItem(LOGGED_OUT_KEY)
}