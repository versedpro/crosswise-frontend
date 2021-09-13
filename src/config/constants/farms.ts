import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   lpSymbol: 'CAKE',
  //   lpAddresses: {
  //     // 97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
  //     97: '0xA98D21C3D61A7EB9Dd3BE9C9a1132Abb7c7Be2Dd',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   token: tokens.syrup,
  //   quoteToken: tokens.wbnb,
  // },


  {
    pid: 0,
    lpSymbol: 'CRSS-BNB LP',
    lpAddresses: {
      // 97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      97: '0xca0ffB7CBFB1161d2267348Bc6F81758586713be',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.crss,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'CRSS-BUSD LP',
    lpAddresses: {
      97: '0x30CB740CfaecD304f74725ebEA43a4F4f9b831b0',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.crss,
    quoteToken: tokens.busd,
  },
   {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xdb66F7D4Fd939661A9783920A0Efae1D22cd189c',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },

 

  
  // {
  //   pid: 252,
  //   lpSymbol: '  ',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   token: tokens.busd,
  //   quoteToken: tokens.wbnb,
  // },
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
