import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading } from '@crosswise/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  return (
    <>
      <Wrapper justifyContent="flex-start" alignItems="center" mb="12px">
        <TokenPairImage primaryToken={token} secondaryToken={quoteToken} width={64} height={64} />
        {/* <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} /> */}
        <Flex flexDirection="column" alignItems="flex-end" ml="12px">
          <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        </Flex>
      </Wrapper>
      <Flex justifyContent="start">
        {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
        <MultiplierTag variant="success">{multiplier}</MultiplierTag>
      </Flex>
    </>
  )
}

export default CardHeading
