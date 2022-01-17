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
      97: '0x14417025110F7E652E6Cf758fF9dCb8e029876A4',
      56: '0xb5d85cA38a9CbE63156a02650884D92A6e736DDC',
    },
    token: tokens.crss,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'CRSS-BUSD LP',
    lpAddresses: {
      97: '0x3d2619e01d9361f9a7e28695c49768e82cf146d9',
      56: '0xb9b09264779733b8657b9b86970e3db74561c237',
    },
    token: tokens.crss,
    quoteToken: tokens.busd,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0x290e1ad05b4d906b1e65b41e689fc842c9962825',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0xef5be81A2B5441ff817Dc3C15FEF0950DD88b9bD',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 5,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0x8151D70B5806E3C957d9deB8bbB01352482a4741',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0x9ba0dce71930e6593ab34a1ebc71c5cebeffdeaf',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0x0458498c2ccbbe4731048751896a052e2a5cc041',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 8,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0xde0356a496a8d492431b808c758ed5075dd85040',
    },
    token: tokens.ada,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 9,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0xcb7ad3af3ae8d6a04ac8eca9a77a95b2a72b06de',
    },
    token: tokens.dot,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 10,
    lpSymbol: 'LINK-BNB LP',
    lpAddresses: {
      97: '0x045e7efe7139ed74cdc21b6f96468e7ce57ed4b3',
      56: '0x278d7d1834e008864cfb247704cf34a171f39a2c',
    },
    token: tokens.link,
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
