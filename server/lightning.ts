import { createLightningRpc } from 'clightning-rpc'

interface LightningConfig {
  rpcPath: string
  network?: 'bitcoin' | 'testnet' | 'regtest'
}

export class LightningService {
  private rpc: any

  constructor(config: LightningConfig) {
    this.rpc = createLightningRpc(config.rpcPath)
  }

  async createBolt12Offer(amount: number, description: string): Promise<string> {
    try {
      const response = await this.rpc.call('offer', [
        amount.toString(),
        description,
        'any',
        {
          single_use: false,
          issuer: 'Bitcoin Username Resolver'
        }
      ])
      return response.bolt12
    } catch (error) {
      console.error('Error creating BOLT 12 offer:', error)
      throw new Error('Failed to create BOLT 12 offer')
    }
  }

  async decodeBolt12(bolt12: string): Promise<any> {
    try {
      const response = await this.rpc.call('decode', [bolt12])
      return response
    } catch (error) {
      console.error('Error decoding BOLT 12:', error)
      throw new Error('Failed to decode BOLT 12 offer')
    }
  }

  async getNodeInfo(): Promise<any> {
    try {
      const response = await this.rpc.call('getinfo', [])
      return response
    } catch (error) {
      console.error('Error getting node info:', error)
      throw new Error('Failed to get node information')
    }
  }
} 
