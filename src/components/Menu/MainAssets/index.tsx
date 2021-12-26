import React, { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex, BinanceIcon, CardIcon } from '@crosswise/uikit'
import styled from 'styled-components'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getCakeAddress, getXCrssAddress } from 'utils/addressHelpers'

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
  const { account } = useWeb3React()
  const { balance: crssBalance } = useTokenBalance(getCakeAddress())
  const { balance: xcrssBalance } = useTokenBalance(getXCrssAddress())

  return (
    <Flex>
      <NetworkBlock>
        <BinanceIcon />
        <StyledContent>BSC</StyledContent>
      </NetworkBlock>
      <Block>
        <CardIcon />
        <StyledContent>{getFullDisplayBalance(xcrssBalance, 18, 2)} XCRSS</StyledContent>
      </Block>
      <Block>
        <CardIcon />
        <StyledContent>{getFullDisplayBalance(crssBalance, 18, 2)} CRSS</StyledContent>
      </Block>
      {/* <Block>
        <StyledContent>0.00 MATIC</StyledContent>
      </Block> */}
    </Flex>
  )
}

export default MainAssets
