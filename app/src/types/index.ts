export interface WalletRecord {
  id: string
  public_address: string
  label: string
  type: 'created' | 'imported'
  private_key: string
  seed_phrase: string
  created: string
  updated: string
}

export interface Transaction {
  id: string
  wallet_id: string
  type: 'send' | 'receive'
  amount: string
  tx_hash: string
  to_address: string
  from_address: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: string
  asset_symbol: string
  created: string
  updated: string
}

export interface Balance {
  wallet_id: string
  address: string
  label: string
  balance: string
  balanceUsd: string
}
