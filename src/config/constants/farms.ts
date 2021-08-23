import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 251,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 252,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
  {
    pid: 445,
    lpSymbol: 'POTS-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xF90BAA331Cfd40F094476E752Bf272892170d399',
    },
    token: tokens.pots,
    quoteToken: tokens.busd,
  },
  {
    pid: 397,
    lpSymbol: 'TUSD-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x2e28b9b74d6d99d4697e913b82b41ef1cac51c6c',
    },
    token: tokens.tusd,
    quoteToken: tokens.busd,
  },
  {
    pid: 443,
    lpSymbol: 'BTT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xdcfbb12ded3fea12d2a078bc6324131cd14bf835',
    },
    token: tokens.btt,
    quoteToken: tokens.busd,
  },
  {
    pid: 442,
    lpSymbol: 'TRX-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xb5d108578be3750209d1b3a8f45ffee8c5a75146',
    },
    token: tokens.trx,
    quoteToken: tokens.busd,
  },
  {
    pid: 441,
    lpSymbol: 'WIN-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x6a445ceb72c8b1751755386c3990055ff92e14a0',
    },
    token: tokens.win,
    quoteToken: tokens.busd,
  },
 
]

export default farms
