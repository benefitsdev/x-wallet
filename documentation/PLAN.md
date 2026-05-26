# ZKX Wallet — Implementation Plan

## Execution Order (To-Do List)

### Phase 1: Project Scaffolding
- [ ] 1.1 Create `./database/` — download PocketBase binary + create `pb_migrations/`
- [ ] 1.2 Scaffold Vite + React + TypeScript project in `./app/`
- [ ] 1.3 Install dependencies: `ethers@6`, `pocketbase`, `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `qrcode.react`
- [ ] 1.4 Create root `.env` with full branding/configuration
- [ ] 1.5 Create root `.gitignore`
- [ ] 1.6 Create `styles.md` — design system documentation
- [ ] 1.7 Configure Tailwind with env-driven theme

### Phase 2: Base Architecture
- [ ] 2.1 Create `src/config/index.ts` — centralized config from env vars
- [ ] 2.2 Create `src/types/index.ts` — TypeScript interfaces
- [ ] 2.3 Create `src/lib/pocketbase.ts` — PocketBase client singleton
- [ ] 2.4 Create `src/lib/ethers.ts` — Ethers.js provider/wallet wrapper
- [ ] 2.5 Create `src/lib/utils.ts` — formatting, validation, address helpers

### Phase 3: Database Migrations
- [ ] 3.1 Migration: create `wallets` collection
- [ ] 3.2 Migration: create `assets` collection + seed ETH
- [ ] 3.3 Migration: create `transactions` collection
- [ ] 3.4 Migration: set API rules (user-scoped access)

### Phase 4: Authentication
- [ ] 4.1 Create `src/store/AuthContext.tsx` — auth state management
- [ ] 4.2 Create `src/hooks/useAuth.ts` — login/register/logout
- [ ] 4.3 Create `src/pages/Login.tsx`
- [ ] 4.4 Create `src/pages/Register.tsx`

### Phase 5: Layout & Navigation
- [ ] 5.1 Create UI components: Button, Input, Card, Modal, Badge
- [ ] 5.2 Create layout: Header, Sidebar, AppLayout
- [ ] 5.3 Set up React Router in `App.tsx`
- [ ] 5.4 Create protected route wrapper (auth check + redirect)

### Phase 6: Wallet Features
- [ ] 6.1 Create `src/hooks/useWallet.ts` — CRUD + balance fetching
- [ ] 6.2 Create `src/pages/WalletCreate.tsx` — generate wallet
- [ ] 6.3 Create `src/pages/WalletImport.tsx` — import via key/seed
- [ ] 6.4 Create `src/components/wallet/WalletGenerator.tsx`
- [ ] 6.5 Create `src/components/wallet/WalletImporter.tsx`

### Phase 7: Dashboard & Balances
- [ ] 7.1 Create `src/pages/Dashboard.tsx`
- [ ] 7.2 Create `src/components/wallet/BalanceCard.tsx`
- [ ] 7.3 Wire up live RPC balance fetching

### Phase 8: Send / Receive
- [ ] 8.1 Create `src/pages/Send.tsx`
- [ ] 8.2 Create `src/pages/Receive.tsx`
- [ ] 8.3 Create `src/components/wallet/SendForm.tsx`
- [ ] 8.4 Create `src/components/wallet/ReceiveModal.tsx`
- [ ] 8.5 Wire up transaction signing + broadcast

### Phase 9: Transaction History
- [ ] 9.1 Create `src/hooks/useTransactions.ts`
- [ ] 9.2 Create `src/pages/Transactions.tsx`
- [ ] 9.3 Create `src/components/wallet/TransactionRow.tsx`
- [ ] 9.4 Create `src/components/wallet/TransactionList.tsx`

### Phase 10: Admin Dashboard
- [ ] 10.1 Create `src/pages/admin/AdminDashboard.tsx`
- [ ] 10.2 Create `src/pages/admin/AdminUsers.tsx`
- [ ] 10.3 Create `src/pages/admin/AdminSettings.tsx`
- [ ] 10.4 Create `src/components/admin/UserTable.tsx`
- [ ] 10.5 Create `src/components/admin/SystemSettings.tsx`

### Phase 11: Polish
- [ ] 11.1 Add QR code component for Receive page
- [ ] 11.2 Add Open Graph meta tags in `index.html`
- [ ] 11.3 Add loading, empty, and error states to all pages
- [ ] 11.4 Run `npm run lint` + `npm run typecheck`
- [ ] 11.5 Verify build with `npm run build`

## Naming Conventions

| Convention | Rule |
|---|---|
| Files | PascalCase for components, camelCase for utilities |
| Exports | Named exports for components, default exports for pages |
| CSS | Tailwind utility classes only (no CSS modules) |
| Environment | All env vars prefixed with `VITE_` in `app/`, read via `config/index.ts` |

## Route Map

| Path | Page | Auth Required | Admin Required |
|---|---|---|---|
| `/login` | Login | No | No |
| `/register` | Register | No | No |
| `/` | Dashboard | Yes | No |
| `/wallet/create` | WalletCreate | Yes | No |
| `/wallet/import` | WalletImport | Yes | No |
| `/send` | Send | Yes | No |
| `/receive/:walletId` | Receive | Yes | No |
| `/transactions` | Transactions | Yes | No |
| `/transactions/:walletId` | Transactions (filtered) | Yes | No |
| `/settings` | Settings | Yes | No |
| `/admin` | AdminDashboard | Yes | Yes |
| `/admin/users` | AdminUsers | Yes | Yes |
| `/admin/settings` | AdminSettings | Yes | Yes |
