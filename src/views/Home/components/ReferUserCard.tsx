import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Text } from 'crosswise-uikit'
import { useTranslation } from 'contexts/Localization'

const StyledReferUserCard = styled(Card)`
  background-image: url('/images/home/jupiter/planet-jupiter.png');
  background-repeat: no-repeat;
  background-position: bottom left 40px;
  // min-height: 376px;
`

const Label = styled(Text)`
  opacity: 0.6;
`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-start;
`

const ReferUserCard = () => {
  const { t } = useTranslation()

  return (
    <StyledReferUserCard>
      <CardBody>
        <Heading scale="lg" mb="24px" mt="16px">
          {t('Refer users')}
        </Heading>
        <Label color="textSubtle">{t('Get 1 % of users lifetime earnings')}</Label>
        <Actions>
          <Button id="check-it" variant="primaryGradient">
            {t('Сopy Ref link')}
          </Button>
        </Actions>
      </CardBody>
    </StyledReferUserCard>
  )
}

export default ReferUserCard
