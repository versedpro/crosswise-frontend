import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Button, ArrowForwardIcon, Flex, ListViewIcon } from '@crosswise/uikit'
import { ChainId } from '@crosswise/sdk'
import styled, { css } from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsData, usePriceCrssBusd } from 'state/farms/hooks'
import useTVL from 'hooks/useTvl'
import useFarmTvl from 'hooks/useFarmTvl'
import useUserFarmStaked from 'hooks/useUserFarmStaked'

import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useThemeManager } from 'state/user/hooks'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'

import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import useMassFarm from './hooks/useMassFarm'

const ControlContainer = styled.div`
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
const FarmHeader = styled.div`
  padding-top: 72px;
  padding-bottom: 32px;

  max-width: 1200px;
  margin: auto;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const FramHeaderLayout = styled.div`
  padding: 0 24px;
  max-width: 1200px;
  margin: auto;
  position: relative;
`

const FarmHeadCard = styled.div<{ isDarkTheme: boolean }>`
  padding: 40px;
  border-radius: 12px;
  position: relative;
  ${(props) =>
    props.isDarkTheme &&
    css`
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.4), -4px -4px 8px 0 rgba(224, 224, 255, 0.04), 0 1px 1px 0 rgba(9, 13, 20, 0.4);
    border: solid 1px rgba(245, 247, 250, 0.06);
    background-image: linear-gradient(102deg, rgba(245, 247, 250, 0.12), rgba(245, 247, 250, 0.06) 52%, rgba(245, 247, 250, 0) 100%);c
    `}

  ${(props) =>
    !props.isDarkTheme &&
    css`
      box-shadow: 8px 8px 24px 0 rgba(9, 13, 20, 0.06), -4px -4px 8px 0 rgba(255, 255, 255, 0.4),
        0 1px 1px 0 rgba(9, 13, 20, 0.06);
      background-image: linear-gradient(102deg, #fff, #fafbfc 52%, #f5f7fa 100%);
    `}
`
const HeaderTopBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-direction: row;
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

const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > ${Text} {
    font-size: 16px;
    padding-right: 8px;
    color: ${({ theme }) => theme.colors.textDisabled};
  }
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

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
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

const Planet3 = styled.div`
  position: absolute;
  z-index: -1;
`

const CardWrapper = styled.div`
  display: flex;

  // ${({ theme }) => theme.mediaQueries.sm} {
  //   flex-direction: row;
  // }
`

const CardItem = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
`
const CardItemLock = styled.div`
  display: flex;
  alignitems: center;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 100px;
  }
`

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const HarvestBtnGroup = styled.div`
  display: flex;
  alignitems: flex-end;
  justify-content: space-between;
  padding-top: 20px;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
`

const StakingToggle = styled.div`
  display: flex;
  alignitems: baseline;
  padding: 10px 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px;
  }
`

const FarmUserInfo = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  @media only screen and (max-width: 760px) {
    justify-content: space-between;
    width: 100%;
  }
`

const MassBtns = styled.div`
  display: flex;
  @media only screen and (max-width: 760px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 568px) {
    font-size: 13px;
    padding: 0px 10px;
    margin-top: 5px;
    flex-direction: column;
  }
  > button {
    @media only screen and (max-width: 760px) and (min-width: 568px) {
      font-size: 15px;
      padding: 0px 10px;
    }
    @media only screen and (max-width: 568px) {
      font-size: 13px;
      padding: 0px 10px;
      margin-top: 5px;
      margin-right: 0px;
    }
  }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const crssPrice = usePriceCrssBusd()
  const [crssTokenPrice, setCrssTokenPrice] = useState(new BigNumber(0))
  const [stackedVal, setStakedVal] = useState(new BigNumber(0))

  // const [farmTvl, setFarmTvl] = useState(new BigNumber(0));
  // const [totalTvl, setTotalTvl] = useState(new BigNumber(0));
  const totalTvl = useTVL()
  const farmTvl = useFarmTvl()
  const userStakedVal = useUserFarmStaked()
  const [CrssTokenEarned, setCrssTokenEarned] = useState(0)
  const [pendingTx, setPendingTx] = useState(false)

  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'crosswise_farm_view' })
  const { account, library } = useWeb3React()
  // console.log(useWeb3React())
  const [sortOption, setSortOption] = useState('hot')
  const chosenFarmsLength = useRef(0)

  const [isDark] = useThemeManager()

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  const [vesting, setVesting] = useState(true)
  const [autoCompound, setAutoCompound] = useState(true)
  const { onMassHarvest, onMassStakeReward } = useMassFarm()

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), crssPrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [crssPrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  const activePids = useMemo(() => {
    let activeFarmPids = []
    activeFarmPids = stakedOnlyFarms.map((farm) => farm.pid)
    return activeFarmPids
  }, [stakedOnlyFarms])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
          if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
            return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
          }
          return farmsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }

    // console.log("chosenFarmMemorize,", chosenFarmsMemoized)
    let temp = new BigNumber(0)
    const getStakedVal = () => {
      chosenFarmsMemoized.map((farm) => {
        // console.log(farm)
        // const lpPrice = useLpTokenPrice(farm.lpSymbol)
        // console.log("lpPrice", lpPrice)
        temp = temp.plus(farm.userData?.earnings)
        return temp
      })
      // console.log("sum temp", getBalanceNumber(temp))
      if (!crssPrice.isNaN()) {
        setCrssTokenEarned(getBalanceNumber(temp.times(crssPrice)))
      }
    }
    getStakedVal()
  }, [chosenFarmsMemoized, observerIsSet, crssPrice])

  useEffect(() => {
    setCrssTokenPrice(crssPrice)
  }, [crssPrice])

  const handleMassHarvest = async () => {
    setPendingTx(true)
    const resp = await onMassHarvest(library, activePids)
    // console.log('massHarvest resp:', resp)
    setPendingTx(false)
  }

  const handleMassStakeReward = async () => {
    setPendingTx(true)
    const resp = await onMassStakeReward(library, activePids)
    // console.log('massStakeReward resp:', resp)
    setPendingTx(false)
  }

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('CROSSWISE', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        crssPrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      farmOption: {
        pid: farm.pid,
        isAuto: farm.userData.isAuto,
        isVest: farm.userData.isVest,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <FlexLayout>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              crssPrice={crssPrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              crssPrice={crssPrice}
              account={account}
              removed
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenFarmsMemoized.map((farm) => (
            <FarmCard
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              crssPrice={crssPrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FlexLayout>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <FarmHeader>
        <HeaderTopBar>
          <Heading scale="xl" color="text" mb="32px" style={{ fontSize: '48px' }}>
            {t('Farms')}
          </Heading>

          <FilterContainer>
            <LabelWrapper>
              <Text color="textSubtle">{t('Sort by')}</Text>
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
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />

            {/* <LabelWrapper style={{ marginLeft: 16 }}>
              <SearchInput onChange={handleChangeQuery} placeholder="Search" />
            </LabelWrapper> */}
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
          </FilterContainer>
        </HeaderTopBar>
        <Text fontSize="20px" color="textSecondary">
          {t('Stake LP tokens to Earn CRSS')}
        </Text>
        {/* <NavLink exact activeClassName="active" to="/farms/auction" id="lottery-pot-banner">
          <Button p="0" variant="text">
            <Text color="primary" bold fontSize="16px" mr="4px">
              {t('Community Auctions')}
            </Text>
            <ArrowForwardIcon color="primary" />
          </Button>
        </NavLink> */}
      </FarmHeader>
      <FramHeaderLayout>
        <FarmHeadCard isDarkTheme={isDark}>
          {/** start first block */}
          <InfoWrap>
            <CardWrapper>
              <CardItem>
                <div>
                  <img src="/images/cards.png" alt="Pancake illustration" />
                </div>
                <div style={{ paddingLeft: '5px' }}>
                  <Text fontSize="13px" color="textSecondary">
                    {t('TOTAL LIQUIDITY')}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Text fontSize="20px" color="textSecondary">
                      ${farmTvl.toFixed(2)}
                    </Text>
                  </div>
                </div>
              </CardItem>
              <CardItemLock>
                <div>
                  <img src="/images/locked.png" alt="Pancake illustration" />
                </div>
                <div style={{ paddingLeft: '5px' }}>
                  <Text fontSize="13px" color="textSecondary">
                    {t('TOTAL VALUE LOCKED')}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <Text fontSize="20px" color="textSecondary">
                      ${totalTvl.toFixed(2)}
                    </Text>
                  </div>
                </div>
              </CardItemLock>
            </CardWrapper>

            <StakingToggle>
              {/* <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {t('Vesting')}
                </Text>
                <Toggle checked={vesting} scale="sm" onChange={() => setVesting(!vesting)} />
              </ToggleWrapper>

              <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {t('Auto-compound')}
                </Text>
                <Toggle checked={autoCompound} scale="sm" onChange={() => setAutoCompound(!autoCompound)} />
              </ToggleWrapper> */}

              <ToggleWrapper>
                <Text fontSize="14px" pr="15px" color="textSecondary">
                  {' '}
                  {t('Staked only')}
                </Text>
                <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              </ToggleWrapper>
            </StakingToggle>
          </InfoWrap>

          {/** end first block */}

          {/** start second block  */}
          <HarvestBtnGroup>
            <FarmUserInfo>
              <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                <Text color="textSecondary" fontSize="13px" pr="8px">
                  CRSS Earned
                </Text>
                <Text color="text" fontSize="13px" mr="24px">
                  ${CrssTokenEarned?.toFixed(2)}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                <Text color="textSecondary" fontSize="13px" pr="8px">
                  xCRSS Earned
                </Text>
                <Text color="text" fontSize="13px" mr="24px">
                  {/* ${parseFloat(crssTokenPrice.toString()).toFixed(4)} */}${CrssTokenEarned?.toFixed(2)}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column' }}>
                <Text color="textSecondary" fontSize="13px" pr="8px">
                  Your Staked Value
                </Text>
                <Text color="text" fontSize="13px" mr="24px">
                  {/* ${parseFloat(crssTokenPrice.toString()).toFixed(4)} */}${userStakedVal.toFixed(2)}
                </Text>
              </div>

              {/* <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Text color="textSecondary" fontSize="13px" pr="8px">
                  STAKED
                </Text>
                <Text color="text" fontSize="13px" mr="24px">
                  $1.812
                </Text>
              </div> */}
            </FarmUserInfo>
            {account ? (
              <MassBtns>
                <Button variant="secondaryGradient" mr="18px" onClick={() => handleMassHarvest()}>
                  Mass Harvest
                </Button>
                <Button variant="primaryGradient" onClick={() => handleMassStakeReward()}>
                  Mass Stake Reward
                </Button>
              </MassBtns>
            ) : (
              <MassBtns>
                <Button variant="secondaryGradient" mr="18px" disabled>
                  Mass Harvest
                </Button>
                <Button variant="primaryGradient" disabled>
                  Mass Stake Reward
                </Button>
              </MassBtns>
            )}
          </HarvestBtnGroup>
          {/** end second block */}
        </FarmHeadCard>
        <Planet1>
          <img src="/images/planet/p1.png" alt="planet1" />
        </Planet1>
        <Planet2>
          <img src="/images/planet/p2.png" alt="planet2" />
        </Planet2>
      </FramHeaderLayout>
      <Page>
        {/* <ControlContainer>
          <ViewControls>
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              <Text> {t('Staked only')}</Text>
            </ToggleWrapper>
            <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
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
                    label: t('Multiplier'),
                    value: 'multiplier',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Liquidity'),
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer> */}
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
        {/* <StyledImage src="/images/decorations/3dpan.png" alt="Pancake illustration" width={120} height={103} /> */}
      </Page>
    </>
  )
}

export default Farms
