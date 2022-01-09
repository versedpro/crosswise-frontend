import React from 'react'
import { Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const CrssWalletBalance = () => {
  const { t } = useTranslation()
  const crssBalance = useTokenBalance(getCakeAddress()).balance
  const { account } = useWeb3React()
  if (!account) {
    return (
      <Text color="textSubtle" style={{ opacity: 0.6 }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(crssBalance)} />
    </>
  )
}

export default CrssWalletBalance
