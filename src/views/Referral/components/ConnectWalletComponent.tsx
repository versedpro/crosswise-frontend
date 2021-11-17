import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Card, CardBody, Text, Input, Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import ConnectWalletButton from 'components/ConnectWalletButton'
import GetReferralLinkCard from './GetReferralLinkCard'

const StyledConnectWalletComponent = styled.div``
// const StyledConnectWalletComponent = styled(Card)``

const Block = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled(Text)`
  opacity: 0.6;
  margin-bottom: 24px;
`

const LinkLabel = styled(Text)`
  line-height: 1.5;
  padding: 0.75rem 1rem 0.75rem 1rem;
  width: 100%;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: '0.75rem 0.5rem 0.75rem 1rem';
`

const Container = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const ConnectWalletComponent = () => {
  const { t } = useTranslation()
  return (
    <StyledConnectWalletComponent>
      <Row justify="space-around">
        <ConnectWalletButton variant="primaryGradient" content="Unlock Wallet" />
      </Row>
    </StyledConnectWalletComponent>
  )
}

export default ConnectWalletComponent
