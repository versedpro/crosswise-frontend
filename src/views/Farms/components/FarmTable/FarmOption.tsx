import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@crosswise/uikit'

export interface FarmOptionProps {
  pid: number
  isAuto: boolean
  isVest: boolean
}

interface FarmOptionPropsWithLoading extends FarmOptionProps {
  userDataReady: boolean
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? theme.colors.text : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`

const FarmOption: React.FunctionComponent<FarmOptionPropsWithLoading> = ({ isAuto, isVest, userDataReady }) => {
  if (userDataReady) {
    return (
      <>
        <h6>ENABLE</h6>
        <span>IsAuto</span>
        {isAuto}
        <span>IsVest</span>
        {isVest}
      </>
    )
  }
  return (
    <>
      <span>Disabled</span>
    </>
  )
}

export default FarmOption
