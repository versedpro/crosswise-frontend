import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'

const StyledLiquidityCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  // min-height: 376px;
`

const StyledText = styled.a`
  color: primary;
`

const Block = styled.div`
  margin-bottom: 16px;
  display: flex;
`

const Label = styled(Text)`
  opacity: 0.6;
`

const LiquidityCard = () => {
  const { t } = useTranslation()

  return (
    <StyledLiquidityCard>
      <CardBody>
        <StyledText>CRSS 🌘</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {t('Add Liquidity to Farms and Pools')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('Add a pair of 2 coins as liquidity and get rewards in our own coin')}
            </Label>
            <Button variant="primaryGradient">Add Liquidity</Button>
          </Block>
        </Row>
      </CardBody>
    </StyledLiquidityCard>
  )
}

export default LiquidityCard
