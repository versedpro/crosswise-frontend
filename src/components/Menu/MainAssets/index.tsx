import React from 'react'
import { Flex, BinanceIcon, CardIcon } from 'crosswise-uikit'
import styled from 'styled-components'

const NetworkBlock = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.input};
  position: relative;
  height: 44px;
  margin-left: 8px;
  margin-right: 8px;
  padding-left: 16px;
  padding-right: 16px;
  & > div {
    opacity: 0.6;
  }
`

const Block = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.input};
  position: relative;
  height: 44px;
  margin-left: 8px;
  margin-right: 8px;
  padding-left: 16px;
  padding-right: 16px;
  opacity: 0.6;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: inline-flex;
  }
`

const StyledContent = styled.div`
  margin-left: 8px;
  vertical-align: middle;
  position: relative;
  color: ${({ theme }) => theme.colors.textSubtle};
`

const MainAssets = () => {
  return (
    <Flex>
      <NetworkBlock>
        <BinanceIcon />
        <StyledContent>BSC</StyledContent>
      </NetworkBlock>
      <Block>
        <CardIcon />
        <StyledContent>0.00 XCRSS</StyledContent>
      </Block>
      <Block>
        <CardIcon />
        <StyledContent>0.00 CRSS</StyledContent>
      </Block>
      <Block>
        {/* <CardIcon /> */}
        <StyledContent>0.00 MATIC</StyledContent>
      </Block>
    </Flex>
  )
}

export default MainAssets
