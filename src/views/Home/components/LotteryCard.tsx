import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from 'crosswise-uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import { useWeb3React } from '@web3-react/core'

const StyledLotteryCard = styled(Card)`
  background-image: url('/images/home/planets/solid-2.png'), url('/images/home/planets/solid.png');
  background-repeat: no-repeat;
  background-position: top 16px right 16px, top 16px right 151px;
  // min-height: 376px;
`

const StyledText = styled.a`
  color: #16b8b8;
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

const LotteryCard = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <StyledLotteryCard>
      <CardBody>
        <StyledText>You Lucky 🍀</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {`${t('Lottery')} `}
          <StyledText>{t('Winnings')}</StyledText>
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('To Collect')}:
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
              {t('Total Jackpot')}:
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
          <Button id="collect-winnings" variant="secondaryGradient">
            {t('Collect Winnings')}
          </Button>
          <Button id="approve" variant="primaryGradient" style={{ marginLeft: '24px' }}>
            {t('Approve')}
          </Button>
        </Actions>
      </CardBody>
    </StyledLotteryCard>
  )
}

export default LotteryCard
