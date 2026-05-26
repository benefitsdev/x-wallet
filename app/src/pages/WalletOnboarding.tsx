import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import { clearLoggedOut } from '@/lib/storage'
import { useWallet } from '@/hooks/useWallet'
import OnboardingLanding from '@/components/wallet/OnboardingLanding'
import SecurityTips from '@/components/wallet/SecurityTips'
import MnemonicDisplay from '@/components/wallet/MnemonicDisplay'
import WalletImporter from '@/components/wallet/WalletImporter'
import ConfirmationScreen from '@/components/wallet/ConfirmationScreen'
import ReadyScreen from '@/components/wallet/ReadyScreen'
import { createRandomWallet } from '@/lib/ethers'

const isPopup = typeof chrome !== 'undefined' && !!chrome.runtime?.id && window.location.pathname.includes('popup.html')

type Step = 'landing' | 'security' | 'create' | 'import' | 'loading_confirm' | 'confirm' | 'ready'

export default function WalletOnboarding() {
  const navigate = useNavigate()
  const containerClasses = isPopup
    ? 'w-[400px] h-[600px] overflow-hidden'
    : 'min-h-screen'
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

  useEffect(() => {
    if (step === 'loading_confirm') {
      const timer = setTimeout(() => {
        setStep('confirm')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const handleCreate = () => {
    setStep('security')
  }

  const handleContinueCreate = () => {
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
      setStep('loading_confirm')
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
      setStep('loading_confirm')
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
    <div className={`${containerClasses} bg-background flex items-center justify-center p-4`}>
      <div className="w-full max-w-2xl">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3 mb-4 text-center">
            {error}
          </div>
        )}

        {step === 'landing' && (
          <OnboardingLanding onCreate={handleCreate} onImport={() => setStep('import')} />
        )}

        {step === 'security' && (
          <SecurityTips
            onNext={handleContinueCreate}
            onBack={() => setStep('landing')}
          />
        )}

        {step === 'create' && generatedMnemonic && (
          <MnemonicDisplay
            mnemonic={generatedMnemonic}
            onConfirm={handleFinishCreate}
            onBack={() => setStep('security')}
          />
        )}

        {step === 'import' && (
          <WalletImporter
            onImport={handleFinishImport}
            onBack={handleGoBack}
          />
        )}

        {step === 'loading_confirm' && (
          <div className="flex flex-col items-center justify-center space-y-6 py-12">
            <div className="text-[#007AFF] animate-bounce">
              <Send size={48} />
            </div>
            <h2 className="text-xl font-medium text-foreground animate-pulse">
              Adding wallet...
            </h2>
          </div>
        )}

        {step === 'confirm' && (
          <ConfirmationScreen
            address={resultAddress}
            label={resultLabel}
            type={resultType}
            onComplete={() => setStep('ready')}
          />
        )}

        {step === 'ready' && (
          <ReadyScreen />
        )}
      </div>
    </div>
  )
}
