import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Toggle, Flex, Modal, InjectedModalProps } from 'crosswise-uikit'
import { useAudioModeManager, useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers } from 'state/swap/hooks'
import usePersistState from 'hooks/usePersistState'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
const CrosswiseToggleWrapper = styled.div`
  .pancakes {
    position: absolute;
  }
`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [rememberExpertModeAcknowledgement, setRememberExpertModeAcknowledgement] = usePersistState(false, {
    localStorageKey: 'pancake_expert_mode_remember_acknowledgement',
  })
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setRememberExpertModeAcknowledgement={setRememberExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (rememberExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <Modal
      title={t('Settings')}
      onDismiss={onDismiss}
      style={{ maxWidth: '380px' }}
    >
      <Flex flexDirection="column">
        {/* <Flex flexDirection="column">
          <Text bold textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
            {t('Swaps & Liquidity')}
          </Text>
        </Flex> */}
        <TransactionSettings />
        <Text fontSize="18px" fontWeight="600" mb="3">{t('Interface Settings')}</Text>
        <Flex justifyContent="space-between" alignItems="center" mb="16px">
          <Flex alignItems="center">
            <Text fontSize="13px" color="textSecondary" fontWeight="500">{t('Expert Mode')}</Text>
            <QuestionHelper
              text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
              ml="4px"
            />
          </Flex>
          <Toggle id="toggle-expert-mode-button" scale="sm" checked={expertMode} onChange={handleExpertModeToggle} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="16px">
          <Flex alignItems="center">
            <Text fontSize="13px" color="textSecondary" fontWeight="500">{t('Disable Multihops')}</Text>
            <QuestionHelper text={t('Restricts swaps to direct pairs only.')} ml="4px" />
          </Flex>
          <Toggle
            id="toggle-disable-multihop-button"
            checked={singleHopOnly}
            scale="sm"
            onChange={() => {
              setSingleHopOnly(!singleHopOnly)
            }}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text fontSize="13px" color="textSecondary" fontWeight="500">{t('Flippy sounds')}</Text>
            <QuestionHelper
              text={t('Fun sounds to make a truly immersive pancake-flipping trading experience')}
              ml="4px"
            />
          </Flex>
          <CrosswiseToggleWrapper>
            <Toggle checked={audioPlay} onChange={toggleSetAudioMode} scale="sm" />
          </CrosswiseToggleWrapper>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default SettingsModal
