import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Image, Text, Button, Toggle } from '@crosswise/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { useFetchPublicPoolsData, usePools, useFetchCakeVault, useCakeVault } from 'state/pools/hooks'
import { usePollFarmsData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import { useThemeManager } from 'state/user/hooks'
import Loading from 'components/Loading'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'

import BountyCard from './components/BountyCard'
import HelpButton from './components/HelpButton'
import PoolsTable from './components/PoolsTable/PoolsTable'
import ToggleView, { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const PoolControls = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`
const PoolHeader = styled.div`
  padding-top: 72px;
  padding-bottom: 32px;

  max-width: 1200px;
  margin: auto;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`
const HeaderTopBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`

const PoolHeaderLayout = styled.div`
  padding: 0 24px;
  max-width: 1200px;
  margin: auto;
  position: relative;
`
const PoolHeadCard = styled.div<{ isDarkTheme: boolean }>`
  padding: 40px;
  border-radius: 12px;
  position: relative;
  ${(props) =>
    props.isDarkTheme &&
    css`
      -webkit-backdrop-filter: blur(40px);
      backdrop-filter: blur(40px);
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.4), -4px -4px 8px 0 rgba(224, 224, 255, 0.04),
        0 1px 1px 0 rgba(9, 13, 20, 0.4);
      border: solid 1px rgba(245, 247, 250, 0.06);
      background-image: linear-gradient(
        102deg,
        rgba(245, 247, 250, 0.12),
        rgba(245, 247, 250, 0.06) 52%,
        rgba(245, 247, 250, 0) 100%
      );
    `}

  ${(props) =>
    !props.isDarkTheme &&
    css`
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.06), -4px -4px 8px 0 rgba(255, 255, 255, 0.4),
        0 1px 1px 0 rgba(9, 13, 20, 0.06);
      background-image: linear-gradient(102deg, #fff, #fafbfc 52%, #f5f7fa 100%);
    `}
`
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  > ${Text} {
    font-size: 12px;
    padding-right: 8px;
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
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

const Planet1 = styled.div`
  position: absolute;
  z-index: -1;
  top: 35px;
  left: -50px;
`

const Planet2 = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -150px;
  right: -80px;
`

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [poolOption, setPoolOption] = useState(true)

  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_pool_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const [isDark] = useThemeManager()

  const [active, setActive] = useState(true)

  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(
    () => partition(poolsWithoutAutoVault, (pool) => pool.isFinished),
    [poolsWithoutAutoVault],
  )
  // console.log("openPools", openPools, finishedPools);
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsData()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
          if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
            return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
          }
          return poolsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }

  if (searchQuery) {
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    chosenPools = chosenPools.filter((pool) =>
      latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
    )
  }

  // chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length

  const cardLayout = (
    <CardLayout>
      {chosenPools.map((pool) =>
        pool.isAutoVault ? (
          // <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
          <></>
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )

  const tableLayout = <PoolsTable pools={chosenPools} account={account} userDataLoaded={userDataLoaded} />

  return (
    <>
      <PoolHeader>
        <HeaderTopBar>
          <Heading scale="xl" color="text" mb="32px" style={{ fontSize: '48px' }}>
            {t('Syrup Pools')}
          </Heading>

          <FilterContainer>
            {/* <LabelWrapper>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('APR'),
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </ControlStretch>
            </LabelWrapper> */}

            <PoolTabButtons
              stakedOnly={stakedOnly}
              setStakedOnly={setStakedOnly}
              hasStakeInFinishedPools={hasStakeInFinishedPools}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {/* <LabelWrapper style={{ marginLeft: 16 }}>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
            </LabelWrapper> */}

            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
          </FilterContainer>
        </HeaderTopBar>
        <Text fontSize="20px" color="textSecondary">
          {t('Simply stake tokens to earn. High APR, low risk.')}
        </Text>
      </PoolHeader>
      <PoolHeaderLayout>
        <PoolHeadCard isDarkTheme={isDark}>
          {/** start first block */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: '16px 18px', background: '#fafbfc', borderRadius: '50%' }}>
                <img src="/images/pool-dollor-icon.png" alt="Pancake illustration" />
              </div>
              <div style={{ paddingLeft: '15px' }}>
                <Text fontSize="20px" color="text">
                  {t('Claim 1 CRSS token')}
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {t('Option')}
                </Text>
                <Toggle checked={poolOption} onChange={() => setPoolOption(!poolOption)} scale="sm" />
              </ToggleWrapper>

              <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {' '}
                  {t('Staked only')}
                </Text>
                <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              </ToggleWrapper>
            </div>
          </div>
          {/** end first block */}

          {/** start second block  */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '5px' }}>
                <Text color="textSecondary" fontSize="13px">
                  {t('TOTAL BALANCE')}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Text color="primary" fontSize="32px" pr="8px">
                  0.000
                </Text>
                <Text color="text" fontSize="13px" mr="24px">
                  ~$0.00
                </Text>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <Button variant="primaryGradient" mr="24px">
                {t('Claim')}
              </Button>
            </div>
          </div>
          {/** end second block */}
        </PoolHeadCard>
        <Planet1>
          <img src="/images/planet/p1.png" alt="planet1" />
        </Planet1>
        <Planet2>
          <img src="/images/planet/p2.png" alt="planet2" />
        </Planet2>
      </PoolHeaderLayout>
      <Page>
        {showFinishedPools && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default Pools
