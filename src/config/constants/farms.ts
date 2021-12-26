import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CRSS',
    lpAddresses: {
      97: '0x4325e2ba865a7e582D98204a85bA276AcD476558',
      56: '',
    },
    token: tokens.crss,
    quoteToken: tokens.crss,
  },

  {
    pid: 1,
    lpSymbol: 'CRSS-BNB LP',
    lpAddresses: {
      97: '0x96aE684CbdBD6C311A325B1979c743c456979e2c',
      56: '',
    },
    token: tokens.crss,
    quoteToken: tokens.wbnb,
  },
  // {
  //   pid: 1,
  //   lpSymbol: 'CRSS-BUSD LP',
  //   lpAddresses: {
  //     97: '0x30CB740CfaecD304f74725ebEA43a4F4f9b831b0',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   token: tokens.crss,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 2,
  //   lpSymbol: 'BUSD-BNB LP',
  //   lpAddresses: {
  //     97: '0xdb66F7D4Fd939661A9783920A0Efae1D22cd189c',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   token: tokens.busd,
  //   quoteToken: tokens.wbnb,
  // },

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
