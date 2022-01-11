import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { usePriceBnbBusd, usePriceCrssBusd } from 'state/farms/hooks'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useRefresh from './useRefresh'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function usePoolTvl() {
  const [balances, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const bnbPrice = usePriceBnbBusd()
  const farms = useSelector((state: State) => state.farms.data)
  const pools = useSelector((state: State) => state.pools.data)

  const calcTvl = useCallback(() => {
    let totalLiquidity = new BigNumber(0)

    pools.map((pool) => {
      const lpSymbol = pool.stakingToken.symbol.concat('-BNB LP')
      const farm = farms.find((f) => f.lpSymbol === lpSymbol)
      if (pool.stakingToken.symbol === 'wBNB') {
        totalLiquidity = totalLiquidity.plus(
          getBalanceNumber(bnbPrice.times(pool.totalStaked), pool.stakingToken.decimals),
        )
      }

      // else if(pool.stableCoin) {
      //   totalLiquidity = totalLiquidity.plus(getBalanceNumber(pool.totalStaked, pool.stakingToken.decimals))
      // }
      else if (pool.totalStaked) {
        const tokenPrice = farm.tokenPriceVsQuote ? bnbPrice.times(farm.tokenPriceVsQuote) : new BigNumber(0)
        totalLiquidity = totalLiquidity.plus(
          getBalanceNumber(tokenPrice.times(pool.totalStaked), pool.stakingToken.decimals),
        )
      }
      return true
    })

    setBalance(totalLiquidity.toNumber())
  }, [farms, bnbPrice, pools])

  useEffect(() => {
    calcTvl()
  }, [fastRefresh, calcTvl])

  return balances
}

export default usePoolTvl
