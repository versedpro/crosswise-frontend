import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, useLocation, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Page from 'components/Layout/Page'

import SubNav from './components/SubNav'
import TradeNow from './TradeNow'
import LimitOrders from './LimitOrders'

const StyledPage = styled(Page)`
  background-image: url('/images/home/planets/planet-pluto.png'), url('/images/home/planets/planet-7.png');
  background-repeat: no-repeat;
  background-position: bottom center, top 120px right 30px;
  background-size: 360px, 200px;
  overflow: show;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    min-height: calc(100vh - 64px);
  }
`

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;

    > div {
      padding: 0;
    }
  }
`

const OrderBook = () => {
  const { path } = useRouteMatch()

  return (
    <StyledPage>
      <ControlContainer>
        <SubNav />
        <Switch>
          <Route path={`${path}/tradenow`}>
            <TradeNow />
          </Route>
          <Route path={`${path}/limitorder`}>
            <LimitOrders />
          </Route>
        </Switch>
        {/* {activeIndex === 0 && <TradeNow />} */}
      </ControlContainer>
    </StyledPage>
  )
}

export default OrderBook
