import { useState } from 'react'

type WalletType = 'phoenix' | 'zeus' | null
type Step = 'wallet-select' | 'wallet-setup' | 'create-offer' | 'dns-setup' | 'verify'

function App() {
  const [selectedWallet, setSelectedWallet] = useState<WalletType>(null)
  const [currentStep, setCurrentStep] = useState<Step>('wallet-select')
  const [offer, setOffer] = useState<string>('')

  const handleWalletSelect = (wallet: WalletType) => {
    setSelectedWallet(wallet)
    setCurrentStep('wallet-setup')
  }

  const handleOfferInput = (offer: string) => {
    setOffer(offer)
    setCurrentStep('dns-setup')
  }

  const renderWalletSelect = () => (
    <div className="bg-apple-gray rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Wallet</h2>
      <p className="text-apple-light-gray mb-8">
        Select a Lightning wallet to create your BOLT 12 offer. These wallets are recommended for their strong BOLT 12 support.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleWalletSelect('phoenix')}
          className="p-6 bg-black rounded-xl hover:bg-apple-blue transition-colors text-left"
        >
          <h3 className="text-xl font-semibold mb-2">Phoenix Wallet</h3>
          <p className="text-apple-light-gray text-sm">
            Simple, non-custodial wallet with excellent BOLT 12 support.
          </p>
        </button>
        <button
          onClick={() => handleWalletSelect('zeus')}
          className="p-6 bg-black rounded-xl hover:bg-apple-blue transition-colors text-left"
        >
          <h3 className="text-xl font-semibold mb-2">Zeus</h3>
          <p className="text-apple-light-gray text-sm">
            Advanced wallet that can connect to your own node.
          </p>
        </button>
      </div>
    </div>
  )

  const renderWalletSetup = () => {
    const steps = selectedWallet === 'phoenix' ? [
      'Download Phoenix Wallet from your app store',
      'Set up Phoenix for the first time',
      'Backup your seed phrase!',
      'Tap "Receive" at the bottom',
      'Tap "Show reusable QR code"',
      'Copy the BOLT 12 offer string (starts with "lno1")'
    ] : [
      'Download Zeus from your app store',
      'Setup Zeus with your Core Lightning node',
      'Save your seed phrase',
      'Swipe left-to-right on the "Lightning" pill',
      'Tap on "Pay Codes"',
      'Set a label for the BOLT 12 pay code',
      'Long-press to copy the BOLT 12 offer'
    ]

    return (
      <div className="bg-apple-gray rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Setup {selectedWallet === 'phoenix' ? 'Phoenix' : 'Zeus'} Wallet
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-apple-blue flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-white pt-1">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Paste your BOLT 12 offer here"
            className="w-full bg-black border border-apple-light-gray rounded-lg px-4 py-2 focus:outline-none focus:border-apple-blue"
            onChange={(e) => handleOfferInput(e.target.value)}
          />
          <p className="text-apple-light-gray text-sm">
            Paste your BOLT 12 offer above to proceed to the next step
          </p>
        </div>
      </div>
    )
  }

  const renderDNSSetup = () => (
    <div className="bg-apple-gray rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6">Set Up DNS Records</h2>
      <p className="text-apple-light-gray mb-8">
        Now that you have your BOLT 12 offer, you'll need to add it to your domain's DNS records.
      </p>
      <div className="space-y-6">
        <div className="bg-black rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Your DNS Record</h3>
          <div className="space-y-2">
            <p className="text-apple-light-gray">
              <span className="text-white">Type:</span> TXT
            </p>
            <p className="text-apple-light-gray">
              <span className="text-white">Name:</span> username.user._bitcoin-payment
            </p>
            <p className="text-apple-light-gray">
              <span className="text-white">Content:</span>
              <pre className="mt-2 p-2 bg-apple-gray rounded-lg overflow-x-auto">
                bitcoin:?lno={offer}
              </pre>
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentStep('verify')}
          className="w-full bg-apple-blue hover:bg-apple-dark-blue text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          I've Added the DNS Record
        </button>
      </div>
    </div>
  )

  const renderVerify = () => (
    <div className="bg-apple-gray rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6">Verify Your Setup</h2>
      <p className="text-apple-light-gray mb-8">
        To verify your setup is working:
      </p>
      <div className="space-y-4">
        <div className="bg-black rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Test Your Username</h3>
          <p className="text-apple-light-gray mb-4">
            Visit <a href="https://satsto.me" target="_blank" rel="noopener noreferrer" className="text-apple-blue hover:underline">satsto.me</a> and enter your username@domain.com
          </p>
          <p className="text-apple-light-gray">
            If everything is set up correctly, you should see your payment information displayed.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-apple-black text-white font-apple">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-2">Bitcoin Username Guide</h1>
          <p className="text-apple-light-gray">Create your human-readable BOLT 12 offer</p>
        </header>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-apple-gray rounded-full">
            <div 
              className="h-1 bg-apple-blue rounded-full transition-all duration-300"
              style={{ 
                width: 
                  currentStep === 'wallet-select' ? '25%' :
                  currentStep === 'wallet-setup' ? '50%' :
                  currentStep === 'dns-setup' ? '75%' : '100%'
              }}
            />
          </div>
        </div>

        {currentStep === 'wallet-select' && renderWalletSelect()}
        {currentStep === 'wallet-setup' && renderWalletSetup()}
        {currentStep === 'dns-setup' && renderDNSSetup()}
        {currentStep === 'verify' && renderVerify()}
      </div>
    </div>
  )
}

export default App 
