import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { Text } from '@crosswise/uikit'

const StyledText = styled(Text)<{
  opacity?: string
}>`
  opacity: ${({ opacity }) => opacity};
`

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  bold?: boolean
  small?: boolean
  color?: string
  opacity?: string
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '40px',
  lineHeight = '1',
  prefix = '',
  bold = true,
  small = false,
  color = 'text',
  opacity = '1',
}) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <StyledText bold={bold} small={small} fontSize={fontSize} style={{ lineHeight }} color={color} opacity={opacity}>
      {prefix}
      {typeof countUp === 'number' ? countUp.toFixed(decimals) : countUp}
    </StyledText>
  )
}

export default CardValue
