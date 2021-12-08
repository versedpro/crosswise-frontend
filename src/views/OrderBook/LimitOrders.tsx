import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Button, ChevronUpIcon, Card, CardBody, Flex } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'

import { useTranslation } from 'contexts/Localization'

import LimitOrderPendingTable from './components/LimitOrderPendingTable'
import LimitOrderExecutedTable from './components/LimitOrderExecutedTable'
import {
  LimitOrderPendingColumnSchema,
  LimitOrderExecutedColumnSchema
} from './components/types'


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

  const { chainId } = useWeb3React()

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [rowData, setRowData] = useState([])

  useEffect(() => {
    switch (pathname) {
      case `${path}/limitorder`:
        case `${path}/limitorder/pending`:
        setActiveIndex(0)
        break
      case `${path}/limitorder/executed`:
        setActiveIndex(1)
        break
      default:
        setActiveIndex(0)
        break
    }
  }, [pathname, path])

  const renderContent = (): JSX.Element => {
    return (
      activeIndex === 0
        ? <LimitOrderPendingTable data={rowData} columns={LimitOrderPendingColumnSchema} />
        : <LimitOrderExecutedTable data={rowData} columns={LimitOrderExecutedColumnSchema} />
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
            to={`${path}/limitorder/pending`}
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
            to={`${path}/limitorder/executed`}
            p="6px 16px 6px 16px"
            style={{ fontWeight: 400 }}
          >
            {t('Executed')}
          </Button>
        </Flex>
        <CardBody>
          <TableWrapper ref={tableWrapperEl}>
            {renderContent()}
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