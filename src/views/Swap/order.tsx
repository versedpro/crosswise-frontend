import React from 'react'
import {
  Button,
  Text,
  ArrowDownIcon,
  ArrowForwardIcon,
  Box,
  useModal,
  Flex,
  Toggle,
  CardsLayout,
} from 'crosswise-uikit'
import { useTranslation } from 'contexts/Localization'
import { ArrowWrapper, SwapCallbackError, Wrapper, StyledCard } from './components/styleds'
import { AppHeader, AppBody } from '../../components/App'
import OrderBuy from './components/orderBuy'
import OrderSell from './components/orderSell'

export default function LimitOrder() {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <AppHeader title={t('Limit')} subtitle={t('')} noConfig />
      <Wrapper id="order-page">
        {/* <AutoRow justify="space-between"> */}
        <CardsLayout className="column-2">
          <OrderBuy />
          <OrderSell />
        </CardsLayout>
        {/* </AutoRow> */}
      </Wrapper>
    </StyledCard>
  )
}
