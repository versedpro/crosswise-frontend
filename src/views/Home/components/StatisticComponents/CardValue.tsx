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
  suffix?: string
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '20px',
  prefix = '',
  bold = false,
  small = false,
  color = 'text',
  opacity = '1',
  suffix = '',
}) => {
  const decimal = decimals !== undefined ? decimals : value < 1 ? 4 : value > 1e5 ? 0 : 3

  if (!value) {
    return (
      <StyledText bold={bold} small={small} fontSize={fontSize} color={color} opacity={opacity}>
        {prefix}
        {0}
        {suffix}
      </StyledText>
    )
  }

  return (
    <StyledText bold={bold} small={small} fontSize={fontSize} color={color} opacity={opacity}>
      {prefix}
      {value.toFixed(decimal)}
      {suffix}
    </StyledText>
  )
}

export default CardValue
