# ZKX Wallet — Product Requirements Document (PRD)

## 1. Executive Summary

A functional MVP Wallet Application for managing digital assets, focused on a clean, high-performance user experience. Similar in scope to MetaMask or Trust Wallet but with a custodial backend.

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Vite + React (TypeScript) |
| Styling | Tailwind CSS |
| Backend / Database | PocketBase (Go binary, SQLite-backed) |
| Blockchain | Ethereum (ETH only, live RPC via Infura/Alchemy) |
| Crypto Library | ethers.js v6 |

## 3. Directory Structure

```
/workspaces/xwallet/
├── .env                      # Root-level branding & configuration
├── .gitignore
├── styles.md                 # Design system documentation
├── README.md
├── documentation/            # Project documentation
│   ├── PRD.md
│   ├── PLAN.md
│   └── ARCHITECTURE.md
├── database/                 # PocketBase instance
│   ├── pocketbase            # PocketBase binary
│   ├── pb_migrations/        # Schema migrations
│   └── pb_data/              # Runtime data (gitignored)
└── app/                      # Main wallet frontend
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── .env                  # Frontend environment variables
    ├── public/
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── config/
        ├── types/
        ├── lib/
        ├── store/
        ├── hooks/
        ├── components/
        │   ├── ui/
        │   ├── layout/
        │   ├── wallet/
        │   └── admin/
        └── pages/
            └── admin/
```

## 4. Core Features

### 4.1 Wallet Management
- Generate new Ethereum wallet (via `ethers.Wallet.createRandom()`)
- Import existing wallet via private key or BIP39 seed phrase
- Encrypted private key storage in PocketBase (custodial model)
- Wallet labeling (user-given names like "Main Wallet", "Savings")

### 4.2 Balance Dashboard
- Display all user wallets with ETH balances
- Live balance fetching via RPC provider (Infura/Alchemy)
- Total portfolio value

### 4.3 Send / Receive
- **Send**: Form with recipient address + amount → decrypt wallet → sign + broadcast transaction → record in history
- **Receive**: Display wallet address with QR code for easy copying

### 4.4 Transaction History
- List of past sends and receives per wallet
- Status indicators: pending, confirmed, failed
- Links to Etherscan (via `VITE_EXPLORER_URL`)

### 4.5 Admin Dashboard (Protected Route)
- User management (view registered users)
- System-wide settings (RPC URL, feature flags)
- Transaction metadata monitoring (non-sensitive)

## 5. Data Models

| Collection | Fields |
|---|---|
| **users** (built-in) | `id`, `email`, `password`, `created`, `updated` |
| **wallets** | `id`, `user_id` (rel), `public_address`, `label`, `encrypted_data` |
| **assets** | `id`, `symbol`, `name`, `decimals` |
| **transactions** | `id`, `wallet_id` (rel), `type` (send/receive), `amount`, `tx_hash`, `to_address`, `from_address`, `status`, `timestamp`, `asset_symbol` |

### Relationships
- **User 1→N Wallets**: One user can have multiple wallets
- **Wallet 1→N Transactions**: Each wallet has its own transaction history
- **Assets**: Pre-seeded with ETH for MVP

## 6. Visual Design

| Attribute | Specification |
|---|---|
| Vibe | Modern, sleek, high-trust |
| Color Palette | Deep blues + grays (Tailwind slate + indigo) |
| Typography | Sans-serif (Inter via `VITE_FONT_FAMILY`) |
| Responsiveness | Mobile + desktop |
| Theming | 100% configurable via `.env` (colors, logo, brand name, fonts) |

## 7. Architecture Decisions (Clarified)

| Question | Decision | Rationale |
|---|---|---|
| Custodial vs Non-Custodial | **Custodial** (keys in PocketBase) | Encrypted with user's PocketBase password via ethers.js |
| Asset Scope | **ETH only** | Single blockchain simplifies MVP |
| Admin Location | **Protected route in `./app`** | Unified build, role-gated via PocketBase admin role |
| ETH Balance | **Live RPC** | Real balance via Infura/Alchemy |
| Admin UI | **Custom React pages** | Built within `./app/admin/*` |
| Encryption Key | **PocketBase password** | Encrypt/decrypt wallet keys using login password |

## 8. Deployment

- **Platforms**: Render, Vercel, or any static host
- **PocketBase**: Deployed separately as a Go binary (Railway, Fly.io, or VPS)
- **Build**: `npm run build` outputs to `app/dist/`
- **Environment**: All config via env vars (no hardcoded secrets)
