import express from 'express'
import dns from 'dns'
import { promisify } from 'util'
import { LightningService } from './lightning'

const app = express()
const port = 3001

app.use(express.json())

const resolveTxt = promisify(dns.resolveTxt)

// Initialize Lightning service
// Note: You'll need to provide the correct path to your Core Lightning socket
const lightning = new LightningService({
  rpcPath: process.env.CLN_RPC_PATH || '/path/to/your/lightning-rpc',
})

app.get('/api/resolve', async (req, res) => {
  const { username } = req.query

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    const [name, domain] = username.split('@')
    if (!name || !domain) {
      return res.status(400).json({ error: 'Invalid username format. Use username@domain.com' })
    }

    const txtRecord = `${name}.user._bitcoin-payment.${domain}`
    const records = await resolveTxt(txtRecord)

    if (!records || records.length === 0) {
      return res.status(404).json({ error: 'No payment information found for this username' })
    }

    // The first record should contain the payment information
    const paymentInfo = records[0][0]
    res.json({ paymentInfo })
  } catch (error) {
    console.error('Error resolving username:', error)
    res.status(500).json({ error: 'Failed to resolve username' })
  }
})

app.post('/api/offers', async (req, res) => {
  const { amount, description } = req.body

  if (!amount || !description) {
    return res.status(400).json({ error: 'Amount and description are required' })
  }

  try {
    const offer = await lightning.createBolt12Offer(amount, description)
    res.json({ offer })
  } catch (error) {
    console.error('Error creating offer:', error)
    res.status(500).json({ error: 'Failed to create BOLT 12 offer' })
  }
})

app.get('/api/node/info', async (req, res) => {
  try {
    const info = await lightning.getNodeInfo()
    res.json(info)
  } catch (error) {
    console.error('Error getting node info:', error)
    res.status(500).json({ error: 'Failed to get node information' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
}) 
