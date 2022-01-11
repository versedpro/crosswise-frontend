import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Skeleton, useTooltip } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface DepositFeeProps {
  depositFee: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const DepositFee: React.FunctionComponent<DepositFeeProps> = ({ depositFee }) => {
  const displayDepositFee = depositFee ? depositFee.toLowerCase() : <Skeleton width={30} />
  const { t } = useTranslation()

  return (
    <Container>
      <MultiplierWrapper>{displayDepositFee}</MultiplierWrapper>
    </Container>
  )
}

export default DepositFee
