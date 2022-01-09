import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { useTotalSupply } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const MarketCap = () => {
  const { t } = useTranslation()
  const crssPriceBusd = usePriceCrssBusd().toNumber()
  const totalSupply = useTotalSupply()
  const marketCap = getBalanceNumber(totalSupply) * crssPriceBusd

  return (
    <>
      <CardValue value={marketCap} />
    </>
  )
}

export default MarketCap
