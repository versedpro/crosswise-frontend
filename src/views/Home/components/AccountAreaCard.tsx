import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'

const StyledText = styled.a`
  color: #4579f5;
  background-color: white;
  border-radius: 4px;
  padding: 3px 8px 5px;
`

const StyledAccountAreaCard = styled(Card)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.gradients.gradprimary};
`

const AccountAreaCard = () => {
  const { t } = useTranslation()

  return (
    <StyledAccountAreaCard>
      <CardBody>
        <StyledText>Start Now 💥</StyledText>
        <Heading scale="xl" mb="24px" mt="16px">
          {t('Personal Account Area')}
        </Heading>
      </CardBody>
    </StyledAccountAreaCard>
  )
}

export default AccountAreaCard
