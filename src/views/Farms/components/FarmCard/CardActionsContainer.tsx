import React, { useState, useCallback, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, Toggle } from '@crosswise/uikit'
import { getAddress } from 'utils/addressHelpers'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { usePriceCrssBusd, useLpTokenPrice } from 'state/farms/hooks'
import Balance from 'components/Balance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import useApproveFarm from '../../hooks/useApproveFarm'

const Action = styled.div`
  padding-top: 16px;
`

const ActionWrapper = styled.div`
  margin-top: 48px;
  padding: 2px;
  border-radius: 4px;
  box-shadow: inset 8px 8px 40px 0 rgba(9, 13, 20, 0.4), inset -4px -4px 8px 0 rgba(224, 224, 255, 0.04),
    inset 0 1px 1px 0 rgba(9, 13, 20, 0.4);
  background-image: ${({ theme }) => theme.colors.gradients.gradthird};
`


const OptionContainer = styled.div`
  display: flex;
  padding: 10px 0px;
  justify-content: space-between;
`
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1px;

  ${Text} {
    margin-left: 1px;
  }
`

export interface FarmWithStakedValue extends Farm {
  apr?: number
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, account, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  // const stakedBalance = new BigNumber(stakedBalanceAsString)

  // console.log("farm data---", farm)
  const [autoVal, setAutoVal] = useState(false)
  const [vestVal, setVestVal] = useState(false)
  const [configFlag, setConfigFlag] = useState(false)
  const changeVest = () => {
    // console.log("change vest")
    setVestVal(!vestVal)
  }
  const changeAuto = () => {
    // console.log("change auto")
    setAutoVal(!autoVal)
  }

  useEffect(() => {
    if(!configFlag){
      setConfigFlag(true)
      setAutoVal(farm.userData.isAuto)
      setVestVal(farm.userData.isVest)
    }
  }, [farm, configFlag])
  

  const stakedBalance = useMemo(() => {
    return new BigNumber(stakedBalanceAsString)
  }, [stakedBalanceAsString])
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const crssPrice = usePriceCrssBusd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(crssPrice).toNumber() : 0

  const lpPrice = useLpTokenPrice(farm.lpSymbol)

  const displayLpBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const lpContract = useERC20(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const rederApprovalOrActioinButton = () => {
    return (
      <>
        <ActionWrapper>
          <Flex>
            {isApproved ? (
              <StakeAction
                stakedBalance={stakedBalance}
                tokenBalance={tokenBalance}
                tokenName={farm.lpSymbol}
                pid={pid}
                addLiquidityUrl={addLiquidityUrl}
                isVest = {vestVal}
                isAuto = {autoVal}
              />
            ) : (
              <Button width="50%" disabled={requestedApproval} onClick={handleApprove} variant="primaryGradient">
                {t('Approve')}
              </Button>
            )}
            <HarvestAction earnings={earnings} pid={pid} />
          </Flex>
        </ActionWrapper>

          {/* Auto Compound & Vesting trigger button start */}
          <OptionContainer>
            <ToggleWrapper>
              <Text fontSize="14px" pr="15px" color="textSecondary">
                {t('Vesting')}
              </Text>
              <Toggle scale="sm" disabled={!account || !stakedBalance.eq(0)} checked={vestVal} onChange={() => changeVest()}/>
              
            </ToggleWrapper>

            <ToggleWrapper>
              <Text fontSize="14px" pr="15px" color="textSecondary">
                {t('Auto Compound')}
              </Text>
              <Toggle scale="sm" disabled={!account || !stakedBalance.eq(0)} checked={autoVal} onChange={() => changeAuto()}/>
            </ToggleWrapper>
          </OptionContainer>
      </>
    )
  }

  return (
    <Action>
      <Flex justifyContent="space-between" mb="4px">
        <Flex>
          <Text textTransform="uppercase" color="textSecondary" fontSize="16px" pr="4px">
            CRSS
          </Text>
          <Text color="textSecondary" fontSize="16px">
            {t('Earned')}
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start">
          <Text color={rawEarningsBalance.eq(0) ? 'textSecondary' : 'textSecondary'} fontSize="16px">
            {displayBalance}
          </Text>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="textSecondary" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" mb="4px">
        <Flex>
          <Text textTransform="uppercase" color="textSecondary" fontSize="16px" pr="4px">
            {farm.lpSymbol}
          </Text>
          <Text color="textSecondary" fontSize="16px">
            {t('Staked')}
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start">
          <Text color={stakedBalance.eq(0) ? 'textSecondary' : 'textSecondary'}>{displayLpBalance()}</Text>
          {stakedBalance.gt(0) && lpPrice.gt(0) && (
            <Balance
              fontSize="12px"
              color="textSecondary"
              decimals={2}
              value={getBalanceNumber(lpPrice.times(stakedBalance))}
              unit=" USD"
              prefix="~"
            />
          )}
        </Flex>
      </Flex>
      {!account ? <ConnectWalletButton mt="8px" width="100%" /> : rederApprovalOrActioinButton()}

    </Action>
  )
}

export default CardActions
