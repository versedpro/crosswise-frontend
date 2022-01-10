import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const BurnedCrss = () => {
  const { t } = useTranslation()
  const burnedCrss = useBurnedBalance(getCakeAddress())

  return (
    <>
      <CardValue value={getBalanceNumber(burnedCrss)} isCountUp />
    </>
  )
}

export default BurnedCrss
