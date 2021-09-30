import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, SettingIcon, useMatchBreakpoints } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 20px;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      <SettingIcon color="textSecondary" style={{ marginRight: '8px' }} />
      {!isMobile && actionPanelToggled ? t('HIDE DETAILS') : t('MORE DETAILS')}
      <ArrowIcon color="textSecondary" toggled={actionPanelToggled} />
    </Container>
  )
}

export default Details
