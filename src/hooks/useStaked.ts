import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { usePriceBnbBusd, usePriceCrssBusd } from 'state/farms/hooks'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useRefresh from './useRefresh'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useStaked() {
  const [balances, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const bnbPrice = usePriceBnbBusd()
  const farms = useSelector((state: State) => state.farms.data)
  const pools = useSelector((state: State) => state.pools.data)

  const calcTvl = useCallback(() => {
    let stakedBalance = new BigNumber(0)

    farms.map((farm) => {
      if (farm.userData && farm.userData.stakedBalance && farm.userData.stakedBalance.toString() !== 'NaN') {
        let quoteTokenPriceUsd = new BigNumber(1)
        if (farm.quoteToken.symbol === 'WBNB') {
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(bnbPrice)
        } else if (farm.quoteToken.symbol === 'BUSD') {
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(1)
        }
        stakedBalance = stakedBalance.plus(
          getBalanceNumber(
            new BigNumber(farm.userData.stakedBalance).times(quoteTokenPriceUsd),
            farm.quoteToken.decimals,
          ),
        )
        // stakedBalance = stakedBalance.plus(new BigNumber(farm.userData.stakedBalance).times(quoteTokenPriceUsd))
      }
      return true
    })

    pools.map((pool) => {
      const lpSymbol = pool.stakingToken.symbol.concat('-BNB LP')
      const farm = farms.find((f) => f.lpSymbol === lpSymbol)
      if (pool.userData && pool.userData.stakedBalance && pool.stakingToken.symbol === 'WBNB') {
        stakedBalance = stakedBalance.plus(
          getBalanceNumber(bnbPrice.times(pool.userData.stakedBalance), pool.stakingToken.decimals),
        )
      } else if (pool.userData && pool.userData.stakedBalance) {
        const tokenPrice = farm.tokenPriceVsQuote ? bnbPrice.times(farm.tokenPriceVsQuote) : new BigNumber(0)
        stakedBalance = stakedBalance.plus(
          getBalanceNumber(tokenPrice.times(pool.userData.stakedBalance), pool.stakingToken.decimals),
        )
      }
      return true
    })

    setBalance(stakedBalance.toNumber())
  }, [farms, bnbPrice, pools])

  useEffect(() => {
    calcTvl()
  }, [fastRefresh, calcTvl])

  return balances
}

export default useStaked
