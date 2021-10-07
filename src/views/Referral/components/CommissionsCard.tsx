import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Card, CardBody, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'

const StyledCommissionsCard = styled(Card)`
  background-image: url('/images/referral/commissionsCard.png');
  background-repeat: no-repeat;
  background-position: bottom right;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled(Text)`
  opacity: 0.6;
`

const CommissionsCard = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <StyledCommissionsCard>
      <CardBody>
        <Heading scale="md" mb="24px" mt="16px">
          {t('Referral Commissions')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('Total CRSS Balance')}
            </Label>
            {!account ? (
              <Text color="textSubtle" style={{ lineHeight: '44px', opacity: 0.6 }}>
                {t('Locked')}
              </Text>
            ) : (
              <Text color="text" fontSize="30px" bold>
                0.0000 CRSS
              </Text>
            )}
          </Block>
        </Row>
      </CardBody>
    </StyledCommissionsCard>
  )
}

export default CommissionsCard
