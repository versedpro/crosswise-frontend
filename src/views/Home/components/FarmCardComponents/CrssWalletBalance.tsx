import React from 'react'
import { Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const CrssWalletBalance = () => {
  const { t } = useTranslation()
  const crssBalance = useTokenBalance(getCakeAddress()).balance
  const crssPriceBusd = usePriceCakeBusd()
  const busdBalance = new BigNumber(getBalanceNumber(crssBalance)).multipliedBy(crssPriceBusd).toNumber()
  console.log('usePriceCakeBusd', usePriceCakeBusd())
  const { account } = useWeb3React()
  if (!account) {
    return (
      <Text color="textSubtle" style={{ lineHeight: '54px', opacity: 0.6 }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={getBalanceNumber(crssBalance)} lineHeight="1.3" fontSize="30px" bold />
      {!crssPriceBusd.eq(0) && <CardBusdValue value={busdBalance} />}
    </Block>
  )
}

export default CrssWalletBalance
