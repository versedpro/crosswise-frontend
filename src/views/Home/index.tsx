import React from 'react'
import styled from 'styled-components'
// import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Row from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import Page from 'components/Layout/Page'
import { BaseLayout, Heading, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import FarmCard from './components/FarmCard'
import LotteryCard from './components/LotteryCard'
import LiquidityCard from './components/LiquidityCard'
import BreakDownCard from './components/BreakDownCard'
import StatisticCard from './components/StatisticCard'
import ReferUserCard from './components/ReferUserCard'
import AccountAreaCard from './components/AccountAreaCard'
import Header from './components/Header'
import ComingSoonCard from './components/ComingSoonCard'

const StyledPage = styled(Page)`
  background-image: url('/images/home/planets/planet-pluto.png'), url('/images/home/planets/planet-7.png');
  background-repeat: no-repeat;
  background-position: bottom center, top 120px right;
  background-size: 360px, 200px;
  overflow: show;
`

const CardsRow = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 100%;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Label = styled(Text)`
  opacity: 0.6;
`

const SubCardsRow = styled(CardsRow)`
  margin-bottom: 0;
  margin-top: 0;
`

const Home: React.FC = () => {
  const { theme } = useTheme()
  // const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <>
      <StyledPage>
        <Row justify="center">
          <AutoColumn justify="center">
            <Heading as="h1" scale="xxl" mb="24px" color="text">
              <Header />
            </Heading>
            <Label color="textSubtle" fontSize="20px">
              {t('Cross-Chain DEX 2.0 With Built-In Tools & Gas Savings')}
            </Label>
          </AutoColumn>
        </Row>
        <CardsRow>
          <FarmCard />
          <ComingSoonCard>
            <LotteryCard />
          </ComingSoonCard>
        </CardsRow>
        <CardsRow>
          <LiquidityCard />
          <BreakDownCard />
        </CardsRow>
        <CardsRow>
          <StatisticCard />
          <SubCardsRow>
            <ReferUserCard />
            <ComingSoonCard>
              <AccountAreaCard />
            </ComingSoonCard>
          </SubCardsRow>
        </CardsRow>
      </StyledPage>
    </>
  )
}

export default Home
