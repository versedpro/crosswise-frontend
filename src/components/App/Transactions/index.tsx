import React from 'react'
import { Button, useModal, RefreshIcon } from 'crosswise-uikit'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <Button variant="text" p={0} onClick={onPresentTransactionsModal} ml="16px">
        <RefreshIcon color="textSubtle" width="24px" />
      </Button>
    </>
  )
}

export default Transactions
