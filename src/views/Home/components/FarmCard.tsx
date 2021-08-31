import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from 'crosswise-uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'

const StyledFarmCard = styled(Card)`
  background-image: url('/images/home/planets/planet-6.png');
  background-repeat: no-repeat;
  background-position: bottom -100px left 40px;
  background-size: 200px;
`

const StyledText = styled.a`
  color: #00bbff;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled(Text)`
  opacity: 0.6;
`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
`

const FarmCard = () => {
  const { t } = useTranslation()

  return (
    <StyledFarmCard>
      <CardBody>
        <StyledText>Very Hight 🔥</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {`${t('Farms')} & `}
          <StyledText>{t('Staking')}</StyledText>
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('To Harvest')}:
            </Label>
            <Text fontSize="30px" bold>
              0.000
            </Text>
            <Label small color="textSubtle">
              ~$ 0.00
            </Label>
          </Block>
          <Block>
            <Label small color="textSubtle">
              {t('In Wallet')}:
            </Label>
            <Text fontSize="30px" bold>
              0.000
            </Text>
            <Label small color="textSubtle">
              ~$ 0.00
            </Label>
          </Block>
        </Row>
        <Actions>
          <Button
            id="harvest-all"
            variant="primaryGradient"
            // disabled={balancesWithValue.length <= 0 || pendingTx}
            // variant={balancesWithValue.length <= 0 || pendingTx ? 'primary' : 'primaryGradient'}
            // onClick={harvestAllFarms}
          >
            {t('Harvest all')}
          </Button>
        </Actions>
      </CardBody>
    </StyledFarmCard>
  )
}

export default FarmCard
