import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import Column from 'components/Layout/Column'

const StyledStatisticCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  // min-height: 376px;
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
  font-size: 13px;
`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
`

const StatisticCard = () => {
  const { t } = useTranslation()

  return (
    <StyledStatisticCard>
      <CardBody>
        <Heading scale="lg" mb="24px" mt="16px">
          {t('View statistics of DEX as a whole and own')}
        </Heading>
        <StyledRow>
          <StyledColumn>
            <Label color="textSubtle">CRSS USD Market Cap:</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">CRSS in Circulation</Label>
            <Text fontSize="20px">0,00%</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">CRSS Burned</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">DEX Liquidity</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
          <StyledColumn>
            <Label color="textSubtle">TVL Value Locked</Label>
            <Text fontSize="20px">0</Text>
          </StyledColumn>
        </StyledRow>
        <Actions>
          <Button id="check-it" variant="primaryGradient">
            {t('Check It')}
          </Button>
        </Actions>
      </CardBody>
    </StyledStatisticCard>
  )
}

export default StatisticCard
