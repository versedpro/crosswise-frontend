import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { useMaxSupply, useTotalSupply } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const Circulation = () => {
  const { t } = useTranslation()
  const maxSupply = useMaxSupply()
  const totalSupply = useTotalSupply()

  const circulation = (getBalanceNumber(totalSupply) / getBalanceNumber(maxSupply)) * 100

  return (
    <>
      <CardValue value={circulation} isCountUp={false} decimals={2} suffix="%" />
    </>
  )
}

export default Circulation
