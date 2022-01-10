import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, IconButton } from '@crosswise/uikit'
import { ViewMode } from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled.div`
  margin-left: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`

const StyledIconButton = styled(IconButton)`
  margin: 0 8px 0 0;
  padding: 10px 24px;
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <Container>
      <StyledIconButton
        variant={viewMode === ViewMode.CARD ? 'secondaryGradient' : 'tertiary'}
        scale="md"
        id="clickFarmCardView"
        onClick={() => handleToggle(ViewMode.CARD)}
      >
        <CardViewIcon color="text" />
      </StyledIconButton>
      <StyledIconButton
        variant={viewMode === ViewMode.TABLE ? 'secondaryGradient' : 'tertiary'}
        scale="md"
        id="clickFarmTableView"
        onClick={() => handleToggle(ViewMode.TABLE)}
      >
        <ListViewIcon color="text" />
      </StyledIconButton>
    </Container>
  )
}

export default ToggleView
