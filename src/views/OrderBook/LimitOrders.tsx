import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouteMatch, useLocation, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Button, ChevronUpIcon, Card, CardBody, Flex } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'

import { useTranslation } from 'contexts/Localization'

import LimitOrderPendingTable from './components/LimitOrderPendingTable'
import LimitOrderExecutedTable from './components/LimitOrderExecutedTable'
import { LimitOrderPendingColumnSchema, LimitOrderExecutedColumnSchema } from './components/types'

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ScrollButtonContainer = styled.div`
  margin: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`

const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  z-index: 1;
  margin: 1rem 0;
`

const LimitOrders = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const tableWrapperEl = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState<number>(0)

  const { chainId } = useWeb3React()

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    switch (pathname) {
      case '/orderbook/limitorder':
      case '/orderbook/limitorder/pending':
        // activeIndex = 0
        setActiveIndex(0)
        break
      case '/orderbook/limitorder/executed':
        // activeIndex = 1
        setActiveIndex(1)
        break
      default:
        // activeIndex = 0
        setActiveIndex(0)
        break
    }
  }, [pathname, path])

  const renderContent = (): JSX.Element => {
    return activeIndex === 0 ? (
      <LimitOrderPendingTable data={rowData} columns={LimitOrderPendingColumnSchema} />
    ) : (
      <LimitOrderExecutedTable data={rowData} columns={LimitOrderExecutedColumnSchema} />
    )
  }

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
      <StyledCard>
        <Flex p="24px" width="100%">
          <Button
            variant={activeIndex === 0 ? 'secondaryGradient' : 'tertiary'}
            scale="sm"
            as={Link}
            to={`${path}/pending`}
            p="6px 16px 6px 16px"
            mr="24px"
            style={{ fontWeight: 400 }}
          >
            {t('Pending')}
          </Button>
          <Button
            variant={activeIndex === 1 ? 'secondaryGradient' : 'tertiary'}
            scale="sm"
            as={Link}
            to={`${path}/executed`}
            p="6px 16px 6px 16px"
            style={{ fontWeight: 400 }}
          >
            {t('Executed')}
          </Button>
        </Flex>
        <CardBody>
          <TableWrapper ref={tableWrapperEl}>
            {renderContent()}
            {/* <Switch>
              <Route path={`${path}/pending`} exact>
                <LimitOrderPendingTable data={rowData} columns={LimitOrderPendingColumnSchema} />
              </Route>
              <Route path={`${path}/executed`} exact>
                <LimitOrderExecutedTable data={rowData} columns={LimitOrderExecutedColumnSchema} />
              </Route>
            </Switch> */}
          </TableWrapper>
        </CardBody>
      </StyledCard>
      <ScrollButtonContainer>
        <Button variant="text" onClick={scrollToTop}>
          {t('To Top')}
          <ChevronUpIcon color="primary" />
        </Button>
      </ScrollButtonContainer>
    </>
  )
}

export default LimitOrders
