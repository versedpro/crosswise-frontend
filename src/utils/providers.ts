import { ethers } from 'ethers'
import { getRpcUrl, getWssUrl } from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()

const WSS_URL = getWssUrl()

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export const simpleWssProvider = new ethers.providers.WebSocketProvider(
  'wss://speedy-nodes-nyc.moralis.io/74ef8961baa2e25faa50a65f/bsc/mainnet/archive/ws',
)

export default null
