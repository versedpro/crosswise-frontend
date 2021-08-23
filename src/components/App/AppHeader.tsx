import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from 'crosswise-uikit'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  children?: ReactNode
  noConfig?: boolean
  hideBorder?: boolean
}

const AppHeaderContainer = styled(Flex)<{ hideBorder: boolean }>`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  border-bottom: ${({ hideBorder }) => (hideBorder ? 'none' : '1px')} solid ${({ theme }) => theme.colors.cardBorder};
`

const AppHeader: React.FC<Props> = ({
  title,
  subtitle,
  helper,
  backTo,
  children,
  noConfig = false,
  hideBorder = false,
}) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer hideBorder={hideBorder}>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px">
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" />}
            <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          <Transactions />
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
