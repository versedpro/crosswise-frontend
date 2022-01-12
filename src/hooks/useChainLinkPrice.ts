import { Currency, Price, JSBI, Token, currencyEquals, Pair } from '@crosswise/sdk'
import BigNumber from 'bignumber.js'
import { useSingleCallResult } from 'state/multicall/hooks'
import { getPriceConsumerContract } from 'utils/contractHelpers'
import { usePriceConsumerContract, useRouterContract } from './useContract'
import { PairState, usePair } from './usePairs'

export function getChainLinkPrice(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  pairState: PairState,
  pair: Pair | null,
): Price | undefined {
  if (!pair) return undefined

  const priceConsumer = getPriceConsumerContract()

  try {
    const price: BigNumber = priceConsumer.getLatestPrice(pair?.liquidityToken.address)

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
  } catch (error) {
    // if the LP pair address was not registered on price consumer contract,
    // getLatestPrice function will reverted
    return undefined
  }
}

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

export function usePriceGuardPaused(token?: Token): boolean | undefined {
  const routerContract = useRouterContract()

  const paused: boolean = useSingleCallResult(routerContract, 'priceGuardPaused', [token?.address])?.result?.[0]

  return token ? paused : undefined
}

export function useMaxSpreadTolerance(token?: Token): number | undefined {
  const routerContract = useRouterContract()

  const tolerance: BigNumber = useSingleCallResult(routerContract, 'maxSpreadTolerance', [token?.address])?.result?.[0]

  return token && tolerance ? tolerance.toNumber() : undefined
}
