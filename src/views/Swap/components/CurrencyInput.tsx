import React from 'react'
import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, Text, Flex } from 'crosswise-uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { Input as NumericalInput } from '../../../components/CurrencyInputPanel/NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '4px')};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
interface CurrencyInputProps {
  label?: string | null
  value: string
  onUserInput: (value: string) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  pair?: Pair | null
  hideInput?: boolean
  id: string
  append?: string | null
}
export default function CurrencyInput({
  label = null,
  value,
  onUserInput,
  currency,
  disableCurrencySelect = false,
  pair = null, // used for double token logo
  hideInput = false,
  id,
  append = null,
}: CurrencyInputProps) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  return (
    <InputPanel id={id}>
      {label ? (
        <LabelRow>
          <Text fontSize="13px" fontWeight="500" color="textSecondary">
            {label}
          </Text>
        </LabelRow>
      ) : (
        <></>
      )}
      <Container hideInput={hideInput}>
        <InputRow selected={disableCurrencySelect}>
          <NumericalInput
            className="token-amount-input"
            value={value}
            onUserInput={(val) => {
              onUserInput(val)
            }}
          />
          <CurrencySelectButton selected={!!currency} className="open-currency-select-button">
            <Flex alignItems="center" justifyContent="space-between">
              {append ? (
                <Text id="append">{append}</Text>
              ) : pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
            </Flex>
          </CurrencySelectButton>
        </InputRow>
      </Container>
    </InputPanel>
  )
}
