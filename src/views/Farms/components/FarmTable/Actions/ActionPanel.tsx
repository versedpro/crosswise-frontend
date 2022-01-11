import React, { useState, useEffect } from 'react'

import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LinkExternal, Text, Toggle } from '@crosswise/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import BigNumber from 'bignumber.js'
import { getBalanceAmount } from 'utils/formatBalance'

import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import { CommunityTag, CoreTag, DualTag } from 'components/Tags'
import { BIG_ZERO } from 'utils/bigNumber'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import FarmOption, { FarmOptionProps } from '../FarmOption'
import DepositFee, { DepositFeeProps } from '../DepositFee'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
  depositFee: DepositFeeProps
  farmOption: FarmOptionProps
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`
const ColumnWrap = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  flex-direction: column;
`
const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  // background: ${({ theme }) => theme.colors.background};
  // border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`
const OptionContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 48px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  liquidity,
  userDataReady,
  depositFee,
  expanded,
  farmOption,
}) => {
  const farm = details
  const [autoVal, setAutoVal] = useState(false)
  const [vestVal, setVestVal] = useState(false)
  const [configFlag, setConfigFlag] = useState(false)
  console.log("details --------", farm)
  useEffect(() => {
    if (!configFlag && userDataReady) {
      setConfigFlag(true)
      if (details.userData?.earnings === '0') {
        setVestVal(true)
      } else {
        setVestVal(farmOption.isVest)
      }
      setAutoVal(farmOption.isAuto)
    }
  }, [farmOption, userDataReady, details, configFlag])
  const { t } = useTranslation()
  let stakedBalance = BIG_ZERO
  const stakedBalanceBigNumber = new BigNumber(details.userData.stakedBalance)
  // If user didn't connect wallet default balance will be 0
  if (!stakedBalanceBigNumber.isZero()) {
    stakedBalance = getBalanceAmount(stakedBalanceBigNumber)
  }
  const temp = !userDataReady || !stakedBalance.eq(0)

  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const bsc = getBscScanLink(lpAddress, 'address')
  const info = `https://crosswise.info/pool/${lpAddress}`

  const changeVest = () => {
    // console.log('change vest')
    setVestVal(!vestVal)
  }

  const changeAuto = () => {
    // console.log('change auto')
    setAutoVal(!autoVal)
  }

  return (
    <ColumnWrap>
      <Container expanded={expanded}>
        <InfoContainer>
          {isActive && (
            <StakeContainer>
              <StyledLinkExternal href={`/add/${liquidityUrlPathParts}`}>
                {t('Get %symbol%', { symbol: lpLabel })}
              </StyledLinkExternal>
            </StakeContainer>
          )}
          <StyledLinkExternal href={bsc}>{t('View Contract')}</StyledLinkExternal>
          <StyledLinkExternal href={info}>{t('See Pair Info')}</StyledLinkExternal>
          {/* <TagsContainer>
          {farm.isCommunity ? <CommunityTag /> : <CoreTag />}
          {dual ? <DualTag /> : null}
        </TagsContainer> */}
        </InfoContainer>
        <ValueContainer>
          <ValueWrapper>
            <Text>{t('APR')}</Text>
            <Apr {...apr} />
          </ValueWrapper>
          <ValueWrapper>
            <Text>{t('Multiplier')}</Text>
            <Multiplier {...multiplier} />
          </ValueWrapper>
          <ValueWrapper>
            <Text>{t('Liquidity')}</Text>
            <Liquidity {...liquidity} />
          </ValueWrapper>
          <ValueWrapper>
            <Text>{t('Deposit Fee')}</Text>
            <DepositFee {...depositFee} />
          </ValueWrapper>
        </ValueContainer>

        <ActionContainer>
          <HarvestAction {...farm} userDataReady={userDataReady} isAuto={autoVal} />
          <StakedAction {...farm} userDataReady={userDataReady} isVest={vestVal} isAuto={autoVal} />
        </ActionContainer>
      </Container>
      <OptionContainer>
        <ToggleWrapper>
          <Text fontSize="14px" pr="15px" color="textSecondary">
            {t('Vesting')}
          </Text>
          {/* <Toggle checked={vesting} scale="sm" onChange={() => setVesting(!vesting)} /> */}
          <Toggle
            scale="sm"
            disabled={!userDataReady || !stakedBalance.eq(0)}
            checked={vestVal}
            onChange={() => changeVest()}
          />
        </ToggleWrapper>

        <ToggleWrapper>
          <Text fontSize="14px" pr="15px" color="textSecondary">
            {t('Auto-compound')}
          </Text>
          <Toggle
            scale="sm"
            disabled={!userDataReady || !stakedBalance.eq(0)}
            checked={autoVal}
            onChange={() => changeAuto()}
          />
        </ToggleWrapper>
      </OptionContainer>
    </ColumnWrap>
  )
}

export default ActionPanel
