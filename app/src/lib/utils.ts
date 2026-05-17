export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatAmount(amount: string, symbol = 'ETH'): string {
  const num = parseFloat(amount)
  if (isNaN(num)) return `0 ${symbol}`
  if (num < 0.0001) return `< 0.0001 ${symbol}`
  return `${num.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${symbol}`
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function isValidPrivateKey(key: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(key) || /^[a-fA-F0-9]{64}$/.test(key)
}
