import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Text, Input, Button } from 'crosswise-uikit'
import { useTranslation } from 'contexts/Localization'
import Row from 'components/Layout/Row'
import GetReferralLinkCard from './GetReferralLinkCard'

const StyledProgramCard = styled(Card)``

const Block = styled.div`
  margin-bottom: 16px;
  width: 100%;
`

const Label = styled(Text)`
  opacity: 0.6;
  margin-bottom: 24px;
`

const LinkLabel = styled(Text)`
  line-height: 1.5;
  padding: 0.75rem 1rem 0.75rem 1rem;
  width: 100%;
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: '0.75rem 0.5rem 0.75rem 1rem';
`

const Container = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const ProgramCard = () => {
  const { t } = useTranslation()

  return (
    <StyledProgramCard>
      <CardBody>
        <Heading scale="md" mb="24px" mt="16px">
          {t('Referral Program')}
        </Heading>
        <Row justify="space-between">
          <Block>
            <Label small color="textSubtle">
              {t(
                'Invite familiar investors and get 5% one-time from their first deposit. The bonus will be credited to your CRSS wallet account.',
              )}
            </Label>
            <Container>
              <LabelRow>
                <Row justify="space-between">
                  <Text fontSize="13px" fontWeight="500" color="textSecondary">
                    Your link
                  </Text>
                </Row>
              </LabelRow>
              {/* <Input placeholder="Your link" value="https://crosswise.com/?ref=adsf51a632safd21fad5fs2f0xdf1a1sd5fas3d2fasdr4q56ew3fdsaf" /> */}
              <InputRow>
                <GetReferralLinkCard />
                {/* <LinkLabel>
                  https://crosswise.com/?ref=adsf51a632safd21fad5fs2f0xdf1a1sd5fas3d2fasdr4q56ew3fdsaf
                </LinkLabel>
                <Text color="primary" style={{ padding: '0.75rem 1rem 0.75rem 1rem', cursor: 'pointer' }}>
                  Copy
                </Text> */}
              </InputRow>
            </Container>
          </Block>
        </Row>
      </CardBody>
    </StyledProgramCard>
  )
}

export default ProgramCard
