import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 4 farms (PID 0, 1, 2, 3) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   lpSymbol: 'CRSS',
  //   lpAddresses: {
  //     97: '0x4325e2ba865a7e582D98204a85bA276AcD476558',
  //     56: '',
  //   },
  //   token: tokens.crss,
  //   quoteToken: tokens.crss,
  // },

  {
    pid: 1,
    lpSymbol: 'CRSS-BNB LP',
    lpAddresses: {
      97: '0xa20bfd5c2abab108284b7c34de3f616f0b885e09',
      56: '',
    },
    token: tokens.crss,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'CRSS-BUSD LP',
    lpAddresses: {
      97: '0x3d2619e01d9361f9a7e28695c49768e82cf146d9',
      56: '',
    },
    token: tokens.crss,
    quoteToken: tokens.busd,
  },
  {
    pid: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },

  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
  // {
  //   pid: 445,
  //   lpSymbol: 'POTS-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF90BAA331Cfd40F094476E752Bf272892170d399',
  //   },
  //   token: tokens.pots,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 397,
  //   lpSymbol: 'TUSD-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x2e28b9b74d6d99d4697e913b82b41ef1cac51c6c',
  //   },
  //   token: tokens.tusd,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 443,
  //   lpSymbol: 'BTT-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xdcfbb12ded3fea12d2a078bc6324131cd14bf835',
  //   },
  //   token: tokens.btt,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 442,
  //   lpSymbol: 'TRX-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xb5d108578be3750209d1b3a8f45ffee8c5a75146',
  //   },
  //   token: tokens.trx,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 441,
  //   lpSymbol: 'WIN-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x6a445ceb72c8b1751755386c3990055ff92e14a0',
  //   },
  //   token: tokens.win,
  //   quoteToken: tokens.busd,
  // },
]

export default farms
