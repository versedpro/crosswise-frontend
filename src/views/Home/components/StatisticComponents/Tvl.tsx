import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { useTotalSupply } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import useTVL from 'hooks/useTvl'
import CardValue from './CardValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const Tvl = () => {
  const { t } = useTranslation()
  const data = useTVL()

  return (
    <>
      <CardValue value={data} prefix="$" isCountUp />
    </>
  )
}

export default Tvl
