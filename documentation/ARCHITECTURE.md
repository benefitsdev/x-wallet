# XWallet — Architecture Document

## System Architecture

```
┌──────────────────────────────────────────────────┐
│                   Browser                         │
│  ┌────────────────────────────────────────────┐  │
│  │         Vite + React App (./app)           │  │
│  │                                            │  │
│  │  ┌──────────┐  ┌────────────────────┐     │  │
│  │  │ Auth     │  │  Wallet Features   │     │  │
│  │  │ Pages    │  │  - Dashboard       │     │  │
│  │  │ (Login/  │  │  - Create/Import   │     │  │
│  │  │ Register)│  │  - Send/Receive    │     │  │
│  │  └────┬─────┘  │  - Transactions    │     │  │
│  │       │        └────────┬───────────┘     │  │
│  │       │                 │                  │  │
│  │  ┌────▼─────────────────▼───────────┐     │  │
│  │  │      PocketBase SDK (REST)       │     │  │
│  │  └──────────────┬───────────────────┘     │  │
│  │                 │                          │  │
│  │  ┌──────────────▼───────────────────┐     │  │
│  │  │      Ethers.js (Blockchain)      │     │  │
│  │  └──────────────────────────────────┘     │  │
│  └────────────────────────────────────────────┘  │
│                   │                               │
└───────────────────┼───────────────────────────────┘
                    │ HTTPS
                    ▼
┌──────────────────────────────────────────────────┐
│              PocketBase Server                    │
│  ┌────────────────────────────────────────────┐  │
│  │  REST API + Admin UI (_/)                  │  │
│  │                                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐ │  │
│  │  │ Users    │  │ Wallets  │  │ Transacts│ │  │
│  │  │ (auth)   │  │ (encrypt │  │ (history)│ │  │
│  │  │          │  │  keys)   │  │          │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘ │  │
│  │  ┌──────────┐  ┌──────────┐               │  │
│  │  │ Assets   │  │ Wallet_  │               │  │
│  │  │ (seed)   │  │ Assets   │               │  │
│  │  └──────────┘  └──────────┘               │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  Ethereum Network    │
        │  (via Infura RPC)    │
        └──────────────────────┘
```

## Data Flow

### Wallet Creation
```
User submits form
  → ethers.Wallet.createRandom()
  → wallet.encrypt(pbPassword)     // encrypt private key
  → POST /api/collections/wallets/records  // store encrypted
  → Display public address
```

### Sending ETH
```
User fills Send form
  → Fetch encrypted_data from PocketBase
  → wallet.decrypt(pbPassword)     // decrypt private key in-memory
  → signer.sendTransaction({to, value})
  → POST /api/collections/transactions/records
  → Poll for receipt, update status
```

### Balance Fetching
```
Dashboard loads
  → GET /api/collections/wallets/records (user's wallets)
  → For each wallet:
      provider.getBalance(public_address)
      → format ETH
  → Display all balances
```

## Security Model

| Concern | Approach |
|---|---|
| Private key storage | AES-encrypted with user's PocketBase password via ethers `encrypt()` |
| Key in memory | Decrypted only during send operation, never persisted to localStorage |
| API access | PocketBase collection rules restrict reads/writes to owner |
| Admin access | PocketBase superuser role checked via `auth.role` |
| Transport | HTTPS between browser ↔ PocketBase |
| RPC | API key stored in server env (or frontend .env for MVP) |

## PocketBase Configuration

### Collection Rules

**wallets**
- List: `@request.auth.id != ""`
- View: `@request.auth.id = user_id.id`
- Create: `@request.auth.id != ""`
- Update: `@request.auth.id = user_id.id`
- Delete: `@request.auth.id = user_id.id`

**transactions**
- List: `@request.auth.id != ""`
- View: `wallet_id.user_id.id = @request.auth.id`
- Create: `@request.auth.id != ""`
- Update/Owner only (for status updates)

**assets**
- List: public
- View: public

## Environment Variables

See root `.env` and `app/.env` for the full list.

All frontend branding is driven by `VITE_*` prefixed vars:
- `VITE_APP_NAME` — brand name (default: "XWallet")
- `VITE_PRIMARY_COLOR` — primary hue (default: indigo)
- `VITE_BACKGROUND_COLOR` — background (default: slate-900)
- `VITE_FONT_FAMILY` — typography (default: Inter)
- `VITE_LOGO_PATH` — logo URL (default: /logo.svg)
- `VITE_RPC_URL` — Ethereum RPC endpoint
- `VITE_CHAIN_ID` — network chain ID
- `VITE_EXPLORER_URL` — block explorer base URL
- `VITE_POCKETBASE_URL` — PocketBase server URL
