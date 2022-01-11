import React, { useState } from 'react'
import { Button, Heading, Skeleton, Text, Flex } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import Balance from 'components/Balance'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceCrssBusd } from 'state/farms/hooks'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import useHarvestFarm from '../../../hooks/useHarvestFarm'

import { ActionContainer, ActionTitles, ActionContent, ActionTitlesContainer, ActionTitleContent } from './styles'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
  isAuto?: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady, isAuto }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  const crssPrice = usePriceCrssBusd()
  let earnings = BIG_ZERO
  let earningsBusd = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(crssPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account, library } = useWeb3React()

  return (
    <ActionContainer>
      <ActionTitlesContainer>
        <ActionTitleContent>
          <ActionTitles>
            <Text bold textTransform="uppercase" color="textSecondary" fontSize="14px" pr="4px">
              CRSS
            </Text>
            <Text bold color="textSecondary" fontSize="14px">
              {t('Earned')}
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Text fontSize="14px">{displayBalance}</Text>
              {earningsBusd > 0 && (
                <Balance
                  fontSize="12px"
                  color="textSecondary"
                  decimals={2}
                  value={earningsBusd}
                  unit=" USD"
                  prefix="~"
                />
              )}
            </div>
          </ActionContent>
        </ActionTitleContent>
        <ActionTitleContent>
          <ActionTitles>
            <Text bold textTransform="uppercase" color="textSecondary" fontSize="14px" pr="4px">
              XCRSS
            </Text>
            <Text bold color="textSecondary" fontSize="14px">
              {t('Earned')}
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Text fontSize="14px">{displayBalance}</Text>
              {earningsBusd > 0 && (
                <Balance
                  fontSize="12px"
                  color="textSecondary"
                  decimals={2}
                  value={earningsBusd}
                  unit=" USD"
                  prefix="~"
                />
              )}
            </div>
          </ActionContent>
        </ActionTitleContent>
      </ActionTitlesContainer>
      <ActionContent>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userDataReady || isAuto}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward(library)
              toastSuccess(
                `${t('Harvested')}!`,
                t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CRSS' }),
              )
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
          }}
          // variant="secondaryGradient"
          variant="primaryGradient"
          ml="4px"
        >
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
