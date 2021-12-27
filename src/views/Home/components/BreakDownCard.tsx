import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Text } from '@crosswise/uikit'
import { useGetStats } from 'hooks/api'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import Column from 'components/Layout/Column'

const StyledBreakDownCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  // min-height: 376px;
`

const StyledText = styled.a`
  color: primary;
`

const StyledRow = styled(Row)`
  width: 100%;
  flex-wrap: wrap;
`

const StyledColumn = styled(Column)`
  width: 33.3%;
`

const Label = styled(Text)`
  opacity: 0.6;
`

const BreakDownCard = () => {
  const { t } = useTranslation()
  const data = useGetStats()

  const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'

  return (
    <StyledBreakDownCard>
      <CardBody>
        <StyledText>Hardware ⚙️</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {t('Your CRSS Breakdown')}
        </Heading>
        <StyledRow>
          <StyledColumn>
            <Label color="textSubtle">You Staked</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Staking APY</Label>
            <Text fontSize="20px">0,00%</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Balance</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Referal Reward</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">Governance Reward</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
        </StyledRow>
      </CardBody>
    </StyledBreakDownCard>
  )
}

export default BreakDownCard
