import { useState, useCallback } from 'react'
import {
  walletFromPrivateKey,
  walletFromPhrase,
  getBalance,
  formatEth,
  shortenAddress,
} from '@/lib/ethers'
import { getWallets, addWallet, generateId } from '@/lib/storage'
import { getPocketBase } from '@/lib/pocketbase'
import type { WalletRecord, Balance } from '@/types'

export function useWallet() {
  const [wallets, setWallets] = useState<WalletRecord[]>([])
  const [balances, setBalances] = useState<Balance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWallets = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const records = await getWallets()
      console.warn(records)
      setWallets(records)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wallets')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createWallet = useCallback(
    async (privateKey: string, seedPhrase: string, label: string, type: 'created' | 'imported') => {
      setError(null)
      try {
        const wallet = new (await import('ethers')).Wallet(privateKey)
        const now = new Date().toISOString()
        const record: WalletRecord = {
          id: generateId(),
          public_address: wallet.address,
          label: label || `Wallet ${shortenAddress(wallet.address)}`,
          type,
          private_key: privateKey,
          seed_phrase: seedPhrase,
          created: now,
          updated: now,
        }
        await addWallet(record)
        setWallets((prev) => [record, ...prev])
        getPocketBase().collection('wallets').create(record).catch(() => {})
        return record
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to create wallet'
        setError(msg)
        throw err
      }
    },
    []
  )

  const importWallet = useCallback(
    async (keyOrPhrase: string, label: string, type: 'created' | 'imported') => {
      setError(null)
      try {
        let wallet
        let privateKey: string
        let seedPhrase = ''

        if (keyOrPhrase.includes(' ')) {
          wallet = walletFromPhrase(keyOrPhrase.trim())
          privateKey = wallet.privateKey
          seedPhrase = keyOrPhrase.trim()
        } else {
          const key = keyOrPhrase.startsWith('0x') ? keyOrPhrase : `0x${keyOrPhrase}`
          wallet = walletFromPrivateKey(key)
          privateKey = key.startsWith('0x') ? key : `0x${key}`
        }

        const now = new Date().toISOString()
        const record: WalletRecord = {
          id: generateId(),
          public_address: wallet.address,
          label: label || `Wallet ${shortenAddress(wallet.address)}`,
          type,
          private_key: privateKey,
          seed_phrase: seedPhrase,
          created: now,
          updated: now,
        }
        await addWallet(record)
        setWallets((prev) => [record, ...prev])
        getPocketBase().collection('wallets').create(record).catch(() => {})
        return record
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to import wallet'
        setError(msg)
        throw err
      }
    },
    []
  )

  const fetchBalances = useCallback(async () => {
    if (wallets.length === 0) {
      setBalances([])
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const results = await Promise.allSettled(
        wallets.map(async (w) => {
          const wei = await getBalance(w.public_address)
          const eth = formatEth(wei)
          return {
            wallet_id: w.id,
            address: w.public_address,
            label: w.label,
            balance: eth,
            balanceUsd: '',
          } as Balance
        })
      )
      const resolved = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => (r as PromiseFulfilledResult<Balance>).value)
      setBalances(resolved)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch balances')
    } finally {
      setIsLoading(false)
    }
  }, [wallets])

  return {
    wallets,
    balances,
    isLoading,
    error,
    fetchWallets,
    createWallet,
    importWallet,
    fetchBalances,
  }
}
