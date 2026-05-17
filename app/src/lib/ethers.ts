import { ethers } from 'ethers'
import { config } from '@/config'

let provider: ethers.JsonRpcProvider | null = null
const cache: Record<string, { balance: bigint; timestamp: number }> = {}
const CACHE_TTL = 15_000

export function getProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(config.rpcUrl, config.chainId, {
      staticNetwork: true,
    })
  }
  return provider
}

export async function getBalance(address: string): Promise<bigint> {
  const cached = cache[address]
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.balance
  }
  const balance = await getProvider().getBalance(address)
  cache[address] = { balance, timestamp: Date.now() }
  return balance
}

export function formatEth(wei: bigint): string {
  return ethers.formatEther(wei)
}

export function parseEth(value: string): bigint {
  return ethers.parseEther(value)
}

export function createRandomWallet(): ethers.HDNodeWallet {
  return ethers.Wallet.createRandom()
}

export function walletFromPrivateKey(key: string): ethers.Wallet {
  return new ethers.Wallet(key)
}

export function walletFromPhrase(phrase: string): ethers.HDNodeWallet {
  return ethers.Wallet.fromPhrase(phrase)
}

export async function encryptWallet(
  wallet: ethers.Wallet | ethers.HDNodeWallet,
  password: string
): Promise<string> {
  return wallet.encrypt(password)
}

export async function decryptWallet(
  encryptedJson: string,
  password: string
): Promise<ethers.Wallet | ethers.HDNodeWallet> {
  return ethers.Wallet.fromEncryptedJson(encryptedJson, password)
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export { ethers }
