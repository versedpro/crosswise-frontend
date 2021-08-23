import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, IconButton } from 'crosswise-uikit'
import { ViewMode } from '../types'

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled.div`
  margin-left: -8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
  }
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      console.log(viewMode)
      console.log("mode", mode)
      onToggle(mode)
    }
  }

  return (
    <Container>
      {
        viewMode === ViewMode.CARD?(
          <IconButton variant="secondaryGradient" scale="md" id="clickFarmCardView" onClick={() => handleToggle(ViewMode.TABLE)} style={{height: '42px', marginLeft: '5px'}} >
            <ListViewIcon color='text' />
          </IconButton>
        ):(
          <IconButton variant="secondaryGradient" scale="md" id="clickFarmTableView" onClick={() => handleToggle(ViewMode.CARD)} style={{height: '42px', marginLeft: '5px'}}>
            <CardViewIcon color='text' />
        </IconButton>
        )
      }
      
     
    </Container>
  )
}

export default ToggleView
