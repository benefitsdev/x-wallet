import { useState, useCallback } from 'react'
import { getPocketBase } from '@/lib/pocketbase'
import { getProvider, parseEth } from '@/lib/ethers'
import { Wallet } from 'ethers'
import type { Transaction, WalletRecord } from '@/types'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const pb = getPocketBase()
      const records = await pb.collection('transactions').getList<Transaction>(1, 50, {
        sort: '-timestamp',
      })
      setTransactions(records.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendTransaction = useCallback(
    async (
      wallet: WalletRecord,
      toAddress: string,
      amount: string
    ) => {
      setError(null)
      try {
        const signer = new Wallet(wallet.private_key).connect(getProvider())

        const pb = getPocketBase()

        const pendingTx = await pb.collection('transactions').create<Transaction>({
          wallet_id: wallet.id,
          type: 'send',
          amount,
          tx_hash: '',
          to_address: toAddress,
          from_address: wallet.public_address,
          status: 'pending',
          timestamp: new Date().toISOString(),
          asset_symbol: 'ETH',
        })

        const tx = await signer.sendTransaction({
          to: toAddress,
          value: parseEth(amount),
        })

        const receipt = await tx.wait()

        const confirmed = await pb.collection('transactions').update<Transaction>(
          pendingTx.id,
          {
            status: receipt?.status === 1 ? 'confirmed' : 'failed',
            tx_hash: tx.hash,
          }
        )

        setTransactions((prev) =>
          prev.map((t) => (t.id === confirmed.id ? confirmed : t))
        )

        return confirmed
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Transaction failed'
        setError(msg)
        throw err
      }
    },
    []
  )

  return {
    transactions,
    isLoading,
    error,
    fetchTransactions,
    sendTransaction,
  }
}
