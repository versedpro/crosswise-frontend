import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Card, CardBody, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'

const StyledTotalCard = styled(Card)`
  background-image: url('/images/referral/totalCard.png');
  background-repeat: no-repeat;
  background-position: top right;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Label = styled(Text)`
  opacity: 0.6;
`

const TotalCard = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <StyledTotalCard>
      <CardBody>
        <Heading scale="md" mb="24px" mt="16px">
          {t('Total Referrals')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t('Invited Peoples')}
            </Label>
            {!account ? (
              <Text color="textSubtle" style={{ lineHeight: '44px', opacity: 0.6 }}>
                {t('Locked')}
              </Text>
            ) : (
              <Text color="text" fontSize="30px" bold>
                0
              </Text>
            )}
          </Block>
        </Row>
      </CardBody>
    </StyledTotalCard>
  )
}

export default TotalCard
