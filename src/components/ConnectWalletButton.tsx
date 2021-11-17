import React from 'react'
import { Button, useWalletModal } from '@crosswise/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  console.log(props)
  const { content } = props

  return (
    <Button
      onClick={() => {
        onPresentConnectModal()
      }}
      {...props}
    >
      {!content ? t('Connect') : t(content)}
      {/* {t('Connect')} */}
      {/* {t('Connect Wallet')} */}
    </Button>
  )
}

export default ConnectWalletButton
