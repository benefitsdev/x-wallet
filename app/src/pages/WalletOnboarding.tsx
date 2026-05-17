import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearLoggedOut } from '@/lib/storage'
import { useWallet } from '@/hooks/useWallet'
import OnboardingLanding from '@/components/wallet/OnboardingLanding'
import MnemonicDisplay from '@/components/wallet/MnemonicDisplay'
import WalletImporter from '@/components/wallet/WalletImporter'
import Confirmation from '@/components/wallet/Confirmation'
import { createRandomWallet } from '@/lib/ethers'

type Step = 'landing' | 'create' | 'import' | 'confirm'

export default function WalletOnboarding() {
  const navigate = useNavigate()
  const { wallets, fetchWallets, createWallet, importWallet } = useWallet()
  const [step, setStep] = useState<Step>('landing')
  const [generatedMnemonic, setGeneratedMnemonic] = useState('')
  const [generatedWallet, setGeneratedWallet] = useState<{ address: string; privateKey: string; mnemonic: string } | null>(null)
  const [resultAddress, setResultAddress] = useState('')
  const [resultLabel, setResultLabel] = useState('')
  const [resultType, setResultType] = useState<'created' | 'imported'>('created')
  const [error, setError] = useState('')
  const isCompleting = useRef(false)

  useEffect(() => {
    clearLoggedOut()
    fetchWallets()
  }, [fetchWallets])

  useEffect(() => {
    if (wallets.length > 0 && !isCompleting.current) {
      navigate('/', { replace: true })
    }
  }, [wallets, navigate])

  const handleCreate = () => {
    const w = createRandomWallet()
    setGeneratedMnemonic(w.mnemonic?.phrase || '')
    setGeneratedWallet({
      address: w.address,
      privateKey: w.privateKey,
      mnemonic: w.mnemonic?.phrase || '',
    })
    setStep('create')
  }

  const handleFinishCreate = async () => {
    if (!generatedWallet) return
    setError('')
    isCompleting.current = true
    try {
      await createWallet(
        generatedWallet.privateKey,
        generatedWallet.mnemonic,
        `Wallet ${generatedWallet.address.slice(0, 6)}`,
        'created'
      )
      setResultAddress(generatedWallet.address)
      setResultLabel(`Wallet ${generatedWallet.address.slice(0, 6)}`)
      setResultType('created')
      setStep('confirm')
    } catch (err) {
      isCompleting.current = false
      setError(err instanceof Error ? err.message : 'Failed to save wallet')
    }
  }

  const handleFinishImport = async (keyOrPhrase: string, _method: 'key' | 'seed') => {
    setError('')
    isCompleting.current = true
    try {
      const record = await importWallet(keyOrPhrase, '', 'imported')
      setResultAddress(record.public_address)
      setResultLabel(record.label)
      setResultType('imported')
      setStep('confirm')
    } catch (err) {
      isCompleting.current = false
      setError(err instanceof Error ? err.message : 'Failed to import wallet')
    }
  }

  const handleGoBack = () => {
    setStep('landing')
    setGeneratedMnemonic('')
    setGeneratedWallet(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3 mb-4 text-center">
            {error}
          </div>
        )}

        {step === 'landing' && (
          <OnboardingLanding onCreate={handleCreate} onImport={() => setStep('import')} />
        )}

        {step === 'create' && generatedMnemonic && (
          <MnemonicDisplay
            mnemonic={generatedMnemonic}
            onConfirm={handleFinishCreate}
            onBack={handleGoBack}
          />
        )}

        {step === 'import' && (
          <WalletImporter
            onImport={handleFinishImport}
            onBack={handleGoBack}
          />
        )}

        {step === 'confirm' && (
          <Confirmation
            address={resultAddress}
            label={resultLabel}
            type={resultType}
          />
        )}
      </div>
    </div>
  )
}
