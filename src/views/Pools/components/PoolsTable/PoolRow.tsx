import React, { useState } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@crosswise/uikit'
import { Pool } from 'state/types'
import { useCakeVault } from 'state/pools/hooks'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'
import StakedCell from './Cells/StakedCell'

interface PoolRowProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  cursor: pointer;
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl } = useMatchBreakpoints()
  const isXLargerScreen = isXl || isXxl
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const isCrssPool = pool.sousId === 0

  const {
    fees: { performanceFee },
  } = useCakeVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell pool={pool} />
        <EarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        {/* {pool.vaultKey === VaultKey.IfoPool ? (
          <IFOCreditCell account={account} />
        ) : isXLargerScreen && isCakePool ? (
          <StakedCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        ) : null} */}
        {
          isXLargerScreen && isCrssPool ?
          (
            <StakedCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
          ) : null
        }
        <AprCell pool={pool} performanceFee={performanceFeeAsDecimal} />
        {(isLg || isXl) && <TotalStakedCell pool={pool} />}
        {isXl && !isCrssPool && <EndsInCell pool={pool} />}
        <ExpandActionCell expanded={expanded} isFullLayout={isMd || isLg || isXl} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={pool}
          userDataLoaded={userDataLoaded}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl }}
        />
      )}
    </>
  )
}

export default PoolRow
