import React from 'react'
import styled from 'styled-components'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { Button, Heading } from '@crosswise/uikit'

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

const SubNav = () => {
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/orderbook/tradenow':
    case '/orderbook/tradenow/all':
    case '/orderbook/tradenow/simple':
      activeIndex = 0
      break
    case '/orderbook/limitorder':
    case '/orderbook/limitorder/pending':
    case '/orderbook/limitorder/executed':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <StyledNav>
      <Heading scale="xl" color="text" mb="32px" style={{ fontSize: '48px' }}>
        <HeadLine>{t('OrderBook')}</HeadLine>
      </Heading>
      <div>
        <Button
          variant={activeIndex === 0 ? 'secondaryGradient' : 'tertiary'}
          scale="md"
          as={Link}
          to={`${url}/tradenow/all`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Trade Now')}
        </Button>
        <Button
          variant={activeIndex === 1 ? 'secondaryGradient' : 'tertiary'}
          scale="md"
          as={Link}
          to={`${url}/limitorder/pending`}
          style={{ margin: '0 8px 0 0', padding: '10px 24px' }}
        >
          {t('Limit orders')}
        </Button>
      </div>
    </StyledNav>
  )
}

export default SubNav
