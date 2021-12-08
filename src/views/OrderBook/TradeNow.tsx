import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { gql, GraphQLClient } from 'graphql-request'
import { Button, ChevronUpIcon, Card, CardBody, Flex } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'

import { useTranslation } from 'contexts/Localization'

import TradeNowTable from './components/TradeNowTable'
import { TradeNowColumnSchema } from './components/types'
import useSimpleOrderTx from './hooks/useSimpleOrderTx'

import { SimpleOrderTxTypes } from './types'


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

const pullTxQuery = gql`
{
  ethereum(network: bsc) {
    dexTrades(
      options: {limit: 100, desc: "timeInterval.minute"}
      smartContractAddress: {is: "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0"}
      protocol: {is: "Uniswap v2"}
      baseCurrency: {is: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"}
      quoteCurrency: {is: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"}
    ) {
      exchange {
        name
      }
      timeInterval {
        minute(count: 15)
      }
      baseCurrency {
        symbol
        address
      }
      baseAmount
      quoteCurrency {
        symbol
        address
      }
      quoteAmount
      trades: count
      tradeAmount(in: USD, calculate: sum)
      buyCurrency {
        address
      }
      transaction {
        hash
      }
    }
  }
}
`

const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  z-index: 1;
  margin: 1rem 0;
`

const TradeNow = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const tableWrapperEl = useRef<HTMLDivElement>(null)

  const { chainId } = useWeb3React()

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [rowData, setRowData] = useState<SimpleOrderTxTypes[]>([])

  const { pullNewTx } = useSimpleOrderTx()
  
  useEffect(() => {
    switch (pathname) {
      case `${path}/tradenow`:
        case `${path}/tradenow/all`:
        setActiveIndex(0)
        break
      case `${path}/tradenow/simple`:
        setActiveIndex(1)
        break
      default:
        setActiveIndex(0)
        break
    }
  }, [pathname, path])

  useEffect(() => {
    const fetchTx = async () => {
      const graphQLClient = new GraphQLClient('https://graphql.bitquery.io/', {
        headers: {
          'X-API-KEY': 'BQYulftEkEkRMrzxdp27BeIUyAAfU1Hz',
        },
      })

      const queryResult: any | undefined = await graphQLClient.request(pullTxQuery)
      if (queryResult?.ethereum?.dexTrades) {
        const txs = queryResult.ethereum.dexTrades.map(tx => {
          const isBuy = tx.baseCurrency.address === tx.buyCurrency.address
          return (
            {
              isBuy,
              tradeFrom: {
                symbol: isBuy ? tx.baseCurrency.symbol : tx.quoteCurrency.symbol,
                address: isBuy ? tx.baseCurrency.address : tx.quoteCurrency.address,
              },
              amountFrom: isBuy ? tx.baseAmount : tx.quoteAmount,
              tradeTo: {
                symbol: isBuy ? tx.quoteCurrency.symbol : tx.baseCurrency.symbol,
                address: isBuy ? tx.quoteCurrency.address : tx.baseCurrency.address,
              },
              amountTo: isBuy ? tx.quoteAmount : tx.baseAmount,
              txDate: tx.timeInterval.minute,
              txLink: tx.transaction.hash
            }
          )
        })
        setRowData(txs)
      }
    }
    if (activeIndex === 0) { // fetch for `Trade Now`
      fetchTx()
    } else {
      setRowData([])
    }
  }, [chainId, activeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      const txs = pullNewTx()
      if (txs.length > 0) {
        setRowData([...txs, ...rowData])
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [pullNewTx, rowData])

  const renderContent = (): JSX.Element => {
    const columnSchema = TradeNowColumnSchema
    return (
      activeIndex === 0
        ? <TradeNowTable data={rowData} columns={columnSchema} />
        : null
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
            to={`${path}/tradenow/all`}
            p="6px 16px 6px 16px"
            mr="24px"
            style={{ fontWeight: 400 }}
          >
            {t('Trade now orders history')}
          </Button>
          <Button
            variant={activeIndex === 1 ? 'secondaryGradient' : 'tertiary'}
            scale="sm"
            as={Link}
            to={`${path}/tradenow/simple`}
            p="6px 16px 6px 16px"
            style={{ fontWeight: 400 }}
          >
            {t('Simple orders')}
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

export default TradeNow