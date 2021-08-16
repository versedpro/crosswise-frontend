import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Button, Heading } from 'crosswise-uikit'
import { useTranslation } from 'contexts/Localization'

const StyledNav = styled.nav`
  margin-bottom: 48px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  a {
    height: 48px;
    padding: 10px 24px;
    border-radius: 6px;
    margin-left: 8px;
  }
`

const HeadLine = styled.div`
  height: 48px;
  opacity: 0.8;
  font-family: Montserrat;
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -2px;
`

const getActiveIndex = (pathname: string): number => {
  if (
    pathname.includes('/pool') ||
    pathname.includes('/create') ||
    pathname.includes('/add') ||
    pathname.includes('/remove') ||
    pathname.includes('/find') ||
    pathname.includes('/liquidity')
  ) {
    return 1
  }
  return 0
}

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => {
  const location = useLocation()
  const { t } = useTranslation()
  return (
    <StyledNav>
      <Heading><HeadLine>{ getActiveIndex(location.pathname) === 0 ? t('Exchange') : t('Liquidity') }</HeadLine></Heading>
      {/* <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {t('Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {t('Liquidity')}
        </ButtonMenuItem>
      </ButtonMenu> */}
      <div>
        <Button id="swap-nav-link" scale="sm" variant={ activeIndex === 0 ? "secondaryGradient" : "tertiary" } to="/swap" as={Link}>{t('Swap')}</Button>
        <Button id="pool-nav-link" scale="sm" variant={ activeIndex === 1 ? "secondaryGradient" : "tertiary" } to="/pool" as={Link}>{t('Liquidity')}</Button>
        {/* <Button id="bridge-nav-link" scale="sm" variant={ activeIndex === 2 ? "secondaryGradient" : "tertiary" } to="#" as={Link}>{t('Bridge')}</Button>
        <Button id="orderbook-nav-link" scale="sm" variant={ activeIndex === 3 ? "secondaryGradient" : "tertiary" } to="#" as={Link}>{t('Orderbook')}</Button> */}
      </div>
    </StyledNav>
  )
}

export default Nav
