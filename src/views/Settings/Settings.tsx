import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Button, Input, Checkbox } from '@crosswise/uikit'
import { ChainId } from '@crosswise/sdk'
import styled, { css } from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsData, usePriceCrssBusd } from 'state/farms/hooks'
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

const SettingsHeader = styled.div`
  padding-top: 72px;
  padding-bottom: 32px;

  max-width: 1200px;
  margin: auto;
  @media only screen and (min-width: 370px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const SettingHeaderLayout = styled.div`
  max-width: 1200px;
  margin: auto;
  position: relative;
`

const SettingsHeadCard = styled.div<{ isDarkTheme: boolean }>`
  margin-bottom: 30px;
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

const Planet1 = styled.div`
  position: absolute;
  z-index: -1;
  top: 35px;
  left: -50px;
`

const Planet2 = styled.div`
  position: absolute;
  z-index: -1;
  bottom: -120px;
  right: -130px;
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

const Settings: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()

  const { account } = useWeb3React()

  const [isDark] = useThemeManager()
  console.log('isDark', isDark)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const showAddress = (param: any): string => {
    console.log(typeof param)
    console.log('hello world')
    if (!param) {
      return ''
    }
    const temp = param.substr(0, 29)
    return temp.concat('...')
  }

  return (
    <>
      <SettingsHeader>
        <HeaderTopBar>
          <Heading as="h1" scale="xl" color="text" mb="32px">
            {t('Personal Account area')}
          </Heading>
        </HeaderTopBar>
      </SettingsHeader>

      <SettingHeaderLayout>
        <SettingsHeadCard isDarkTheme={isDark}>
          <Text fontSize="20px" color="text">
            Wallet Settings
          </Text>
          <div style={{ marginTop: '45px' }}>
            <Text fontSize="13px" color="textSecondary">
              Wallet address
            </Text>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Text fontSize="16px" color="textSecondary">
                {showAddress(account)}
              </Text>
              {account && (
                <div style={{ color: '#16b8b8', fontSize: '16px', paddingLeft: '20px', cursor: 'pointer' }}>Copy</div>
              )}
            </div>
          </div>
        </SettingsHeadCard>
        <Planet2>
          <img src="/images/planet/p4.png" alt="planet1" />
        </Planet2>
      </SettingHeaderLayout>

      <SettingHeaderLayout>
        <SettingsHeadCard isDarkTheme={isDark}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left block start */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
              <Text fontSize="20px" color="text">
                Wallet Settings
              </Text>
              <div>
                <Text color="textSecondary" fontSize="13px">
                  Username:
                </Text>
                <Input type="text" placeholder="" scale="md" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
                <Checkbox scale="sm" />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Set email address for notifications
                </Text>
              </div>

              <div>
                <Input type="text" placeholder="User email:" scale="md" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Set Telegram nickname for notifications
                </Text>
              </div>

              <div>
                <Input type="text" placeholder="Telegram nickname:" scale="md" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Get Notifications
                </Text>
              </div>
            </div>
            {/* Left block end */}

            {/* Right block start */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
              <Text fontSize="20px" color="text">
                DEX Settings
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                <Checkbox scale="sm" />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Gassless mode
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Auto Vesting (burn 50% XCRSS and get it directly as CRSS
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Auto Compaund (5% performance fee)
                </Text>
              </div>
            </div>
            {/* Right block end */}
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primaryGradient">Save</Button>
          </div>
        </SettingsHeadCard>
      </SettingHeaderLayout>
    </>
  )
}

export default Settings
