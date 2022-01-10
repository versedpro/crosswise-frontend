import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import useStaked from 'hooks/useStaked'
import CardValue from './CardValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const StakedCrss = () => {
  const { t } = useTranslation()
  const data = useStaked()

  return (
    <>
      <CardValue value={data} />
    </>
  )
}

export default StakedCrss
