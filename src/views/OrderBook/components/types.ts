export type ColumnsDefTypes = {
  id: number
  name: string
  label: string
  sortable: boolean
  width: string
}

export const TradeNowColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'tradeFrom',
    label: 'Traded from',
    sortable: true,
    width: '15%'
  },
  {
    id: 2,
    name: 'amountFrom',
    label: 'Amount',
    sortable: true,
    width: '15%'
  },
  {
    id: 3,
    name: 'tradeTo',
    label: 'Traded to',
    sortable: true,
    width: '15%'
  },
  {
    id: 4,
    name: 'amountTo',
    label: 'Amount',
    sortable: true,
    width: '15%'
  },
  {
    id: 5,
    name: 'txDate',
    label: 'Date',
    sortable: true,
    width: '20%'
  },
  {
    id: 6,
    name: 'txLink',
    label: 'Transaction Link',
    sortable: true,
    width: '20%'
  }
]

export const LimitOrderPendingColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'tradeFrom',
    label: 'Traded from',
    sortable: true,
    width: '15%'
  },
  {
    id: 2,
    name: 'amountFrom',
    label: 'Amount',
    sortable: true,
    width: '15%'
  },
  {
    id: 3,
    name: 'tradeTo',
    label: 'Traded to',
    sortable: true,
    width: '15%'
  },
  {
    id: 4,
    name: 'amountTo',
    label: 'Amount',
    sortable: true,
    width: '15%'
  },
  {
    id: 5,
    name: 'limitSellPrice',
    label: 'Limit Sell Price',
    sortable: true,
    width: '20%'
  },
  {
    id: 6,
    name: 'limitBuyPrice',
    label: 'Limit Buy Price',
    sortable: true,
    width: '20%'
  },
  {
    id: 7,
    name: 'executedTime',
    label: 'Executed Time',
    sortable: true,
    width: '20%'
  }
]

export const LimitOrderExecutedColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'tradeFrom',
    label: 'Traded from',
    sortable: true,
    width: '15%'
  },
  {
    id: 2,
    name: 'amountFrom',
    label: 'Amount',
    sortable: true,
    width: '15%'
  },
  {
    id: 3,
    name: 'tradeTo',
    label: 'Traded to',
    sortable: true,
    width: '15%'
  },
  {
    id: 4,
    name: 'amountTo',
    label: 'Amount',
    sortable: true,
    width: '15%'
  },
  {
    id: 5,
    name: 'limitSellPrice',
    label: 'Limit Sell Price',
    sortable: true,
    width: '20%'
  },
  {
    id: 6,
    name: 'limitBuyPrice',
    label: 'Limit Buy Price',
    sortable: true,
    width: '20%'
  },
  {
    id: 7,
    name: 'executedTime',
    label: 'Executed Time',
    sortable: true,
    width: '20%'
  },
  {
    id: 8,
    name: 'linkToExplorer',
    label: 'Link to explorer',
    sortable: true,
    width: '20%'
  }
]