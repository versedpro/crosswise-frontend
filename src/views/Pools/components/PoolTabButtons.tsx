import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Toggle, Text, NotificationDot, Button } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import ToggleView, { ViewMode } from './ToggleView/ToggleView'

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
    display: block;
  }
`

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools, viewMode, setViewMode }) => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()

  // const viewModeToggle = <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />

  const liveOrFinishedSwitch = (
    <Wrapper>
      {/* <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {t('Active')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedPools}>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {t('Inactive')}
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu> */}
      <div>
        <Button
          variant={isExact ? 'secondaryGradient' : 'tertiary'}
          scale="md"
          as={Link}
          to={`${url}`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Active')}
        </Button>
        <Button
          variant={isExact ? 'tertiary' : 'secondaryGradient'}
          scale="md"
          as={Link}
          to={`${url}/history`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Inactive')}
        </Button>
      </div>
    </Wrapper>
  )

  // const stakedOnlySwitch = (
  //   <ToggleWrapper>
  //     <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
  //     <Text> {t('Staked only')}</Text>
  //   </ToggleWrapper>
  // )

  return (
    <ViewControls>
      {/* {viewModeToggle}
      {stakedOnlySwitch} */}
      {liveOrFinishedSwitch}
    </ViewControls>
  )
}

export default PoolTabButtons
