import { Currency, Price, JSBI, Token, currencyEquals } from '@crosswise/sdk'
import BigNumber from 'bignumber.js'
import { useSingleCallResult } from 'state/multicall/hooks'
import { usePriceConsumerContract, useRouterContract } from './useContract'
import { PairState, usePair } from './usePairs'

export default function useChainLinkPrice(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
): Price | undefined {
  const priceConsumer = usePriceConsumerContract()
  const [pairState, pair] = usePair(inputCurrency, outputCurrency)

  const price: BigNumber = useSingleCallResult(priceConsumer, 'getLatestPrice', [pair?.liquidityToken.address])
    ?.result?.[0]

  // Price consumer returns the price of 8 decimals
  const denominator: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(8))

  if (!currencyEquals(inputCurrency, pair?.token0)) {
    return pairState === PairState.EXISTS && price
      ? new Price(inputCurrency, outputCurrency, denominator, JSBI.BigInt(price))
      : undefined
  }
  return pairState === PairState.EXISTS && price
    ? new Price(inputCurrency, outputCurrency, JSBI.BigInt(price), denominator)
    : undefined
}

export function useMaxSpreadTolerance(token?: Token): number | undefined {
  const routerContract = useRouterContract()

  const tolerance: BigNumber = useSingleCallResult(routerContract, 'maxSpreadTolerance', [token?.address])?.result?.[0]

  return token && tolerance ? tolerance.toNumber() : undefined
}
