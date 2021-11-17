import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
// import useTheme from 'hooks/useTheme'
import { AutoColumn } from 'components/Layout/Column'
import Page from 'components/Layout/Page'
import { BaseLayout, Heading, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import TotalCard from './components/TotalCard'
import CommissionsCard from './components/CommissionsCard'
import GetReferralLinkCard from './components/GetReferralLinkCard'
import ProgramCard from './components/ProgramCard'
import ConnectWalletComponent from './components/ConnectWalletComponent'

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

const Home: React.FC = () => {
  // const { theme } = useTheme()
  const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <>
      <StyledPage>
        <AutoColumn justify="flex-start">
          <Heading as="h1" scale="xxl" mb="24px" color="text">
            {t('CrossWise Referral Program')}
          </Heading>
          <Label color="textSubtle" fontSize="20px">
            {t("Share the referral link below to invite your friends and earn 1% of your friends' earnings FOREVER!")}
          </Label>
        </AutoColumn>
        <CardsRow>
          <TotalCard />
          <CommissionsCard />
        </CardsRow>
        {account !== undefined ? (
          <>
            <ProgramCard />
          </>
        ) : (
          <>
            <ConnectWalletComponent />
          </>
        )}
      </StyledPage>
    </>
  )
}

export default Home
