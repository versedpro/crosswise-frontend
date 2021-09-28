import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.crss,
    earningToken: tokens.crss,
    contractAddress: {
      97: '0xb31b99aadA093d58bf87ceA535eaCD5349039f56',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.crss,  
    earningToken: tokens.busd,
    contractAddress: {
      97: '0xb31b99aadA093d58bf87ceA535eaCD5349039f56',
      56: '0xBeDb490970204cb3CC7B0fea94463BeD67d5364D',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 2,
    tokenPerBlock: '0.0868',
    isFinished: false,
  }
  
]

export default pools
