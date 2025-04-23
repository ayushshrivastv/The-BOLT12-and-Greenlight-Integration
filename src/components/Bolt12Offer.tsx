import { useState } from 'react'

interface Bolt12OfferProps {
  onOfferCreated: (offer: string) => void
}

export function Bolt12Offer({ onOfferCreated }: Bolt12OfferProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [offer, setOffer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Example offers for testing
  const exampleOffers = [
    {
      amount: '1000',
      description: 'Tip for coffee',
      label: 'Simple tip'
    },
    {
      amount: '10000',
      description: 'Monthly newsletter subscription',
      label: 'Subscription'
    },
    {
      amount: '5000',
      description: 'One-time donation',
      label: 'Donation'
    }
  ]

  const handleExampleClick = (example: typeof exampleOffers[0]) => {
    setAmount(example.amount)
    setDescription(example.description)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    // Validate amount
    const amountNum = parseInt(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount greater than 0')
      setIsLoading(false)
      return
    }

    // Validate description
    if (description.trim().length < 3) {
      setError('Description must be at least 3 characters long')
      setIsLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountNum,
          description: description.trim(),
        }),
      })

      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setOffer(data.offer)
        onOfferCreated(data.offer)
      }
    } catch (error) {
      setError('Failed to create BOLT 12 offer. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Create BOLT 12 Offer</h2>
      
      {/* Example Templates */}
      <div className="mb-6">
        <h3 className="text-sm text-apple-light-gray mb-2">Quick Templates</h3>
        <div className="flex flex-wrap gap-2">
          {exampleOffers.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1 text-sm bg-apple-gray hover:bg-apple-blue transition-colors rounded-full text-white"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm text-apple-light-gray mb-2">
            Amount (sats)
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black border border-apple-light-gray rounded-lg px-4 py-2 focus:outline-none focus:border-apple-blue"
              required
              min="1"
              placeholder="1000"
            />
            <span className="absolute right-3 top-2 text-apple-light-gray">sats</span>
          </div>
          <p className="mt-1 text-xs text-apple-light-gray">
            Minimum amount: 1 sat
          </p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm text-apple-light-gray mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black border border-apple-light-gray rounded-lg px-4 py-2 focus:outline-none focus:border-apple-blue"
            required
            placeholder="What is this payment for?"
            minLength={3}
          />
          <p className="mt-1 text-xs text-apple-light-gray">
            Minimum 3 characters
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-apple-blue hover:bg-apple-dark-blue text-white font-medium py-2 px-4 rounded-lg transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating...' : 'Create Offer'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      {offer && (
        <div className="mt-6 p-4 bg-black rounded-lg">
          <h3 className="text-lg font-medium mb-2">Generated BOLT 12 Offer</h3>
          <p className="text-sm text-apple-light-gray mb-4">
            This is a real BOLT 12 offer that can be used with compatible wallets like Phoenix or Zeus
          </p>
          <pre className="whitespace-pre-wrap break-all text-apple-light-gray">
            {offer}
          </pre>
        </div>
      )}
    </div>
  )
} 
