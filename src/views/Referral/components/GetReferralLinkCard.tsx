import React from 'react'
import styled from 'styled-components'
import { Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import CopyToClipboard from './CopyToClipboard'

const Block = styled.div`
  // margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LinkLabel = styled(Text)`
  line-height: 1.5;
  padding: 0.75rem 1rem 0.75rem 1rem;
  width: 100%;
`

const GetReferralLinkCard = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  const toCopy = account
  const copyText = window.btoa(toCopy)

  return (
    <Block>
      <LinkLabel>{`${window.location.protocol}//${window.location.host}/farms/?ref=${copyText}`}</LinkLabel>
      <CopyToClipboard toCopy={`${window.location.protocol}//${window.location.host}/farms/?ref=${copyText}`}>
        Copy
      </CopyToClipboard>
    </Block>
  )
}

export default GetReferralLinkCard
