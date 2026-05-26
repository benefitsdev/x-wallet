export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'XWallet',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Secure Digital Asset Wallet',
  logoPath: import.meta.env.VITE_LOGO_PATH || '/logo.svg',

  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID',
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '1', 10),
  explorerUrl: import.meta.env.VITE_EXPLORER_URL || 'https://etherscan.io',

  assetSymbol: import.meta.env.VITE_ASSET_SYMBOL || 'ETH',
  assetName: import.meta.env.VITE_ASSET_NAME || 'Ethereum',
  assetDecimals: parseInt(import.meta.env.VITE_ASSET_DECIMALS || '18', 10),

  pocketBaseUrl: import.meta.env.VITE_POCKETBASE_URL || 'http://207.189.0.231:8090',
} as const
