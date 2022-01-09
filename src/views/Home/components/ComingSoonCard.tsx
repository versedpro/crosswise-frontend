import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import { useWeb3React } from '@web3-react/core'

const StyledComingSoonCard = styled(Card)`
  border: none;
  & > div {
    height: 100%;
  }
`

const StyledDiv = styled('div')`
  height: 100%;
  & > div {
    height: 100%;
  }
`
const MainDiv = styled(StyledDiv)`
  filter: blur(3px);
`

const OverlayDiv = styled(StyledDiv)`
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: center;
  & > h2 {
    height: 0;
    transform: translateY(-30px);
    color: #9b42f5;
    text-align: center;
  }
`

const ComingSoonCard = ({ children, isBlock = true }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <StyledComingSoonCard>
      <MainDiv>{children}</MainDiv>
      <OverlayDiv>
        {isBlock ? (
          <Heading scale="xl" color="">
            {`${t('Coming Soon')} `}
          </Heading>
        ) : (
          <></>
        )}
      </OverlayDiv>
    </StyledComingSoonCard>
  )
}

export default ComingSoonCard
