import React from 'react'
import styled from 'styled-components'

import { ColumnType, useTable } from '@crosswise/uikit'

import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { LimitOrderExecutedColumnSchema } from './types'

export type Token = {
  symbol: string
  address: string
}

export interface RowProps {
  isBuy: boolean
  tradeFrom: Token
  amountFrom: number
  tradeTo: Token
  amountTo: number
  limitSellPrice: number
  limitBuyPrice: number
  executedTime: string
  linkToExplorer: string
}

export interface TableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  sortColumn?: string
}

const TableContainer = styled.div`
  width: 100%;
  position: relative;
`

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

const TableHeader = styled.thead`
  th {
    text-align: left;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
`

const TableBody = styled.tbody`
  & tr {
    td {
      vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-top: 30px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(224, 224, 255, 0.6);
    }
  }
`

const Row = ({
  tradeFrom,
  amountFrom,
  tradeTo,
  amountTo,
  limitSellPrice,
  limitBuyPrice,
  executedTime,
  linkToExplorer
} : RowProps) => {
  const { chainId } = useActiveWeb3React();

  return (
    <tr>
      <td>{tradeFrom.symbol}</td>
      <td>{amountFrom.toFixed(2)}</td>
      <td>{tradeTo.symbol}</td>
      <td>{amountTo.toFixed(2)}</td>
      <td>{limitSellPrice.toFixed(2)}</td>
      <td>{limitBuyPrice.toFixed(2)}</td>
      <td>{executedTime}</td>
      <td>{linkToExplorer}</td>
    </tr>
  )
}

const LimitOrderExecutedTable = ({
  data,
  columns
}: TableProps) => {
  const { t } = useTranslation()
  const { rows } = useTable(columns, data, { sortable: false, sortColumn: 'txDate' });

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map(column => {
              const schema = LimitOrderExecutedColumnSchema.find(colSchema => colSchema.name === column.name);
              return (
                <th key={`${schema.id}th`} style={{ width: schema.width }}>{schema.label ?? column.label}</th>
              )
            })}
          </tr>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            return <Row {...row.original} key={`table-row-${row.id}`} />
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}

export default LimitOrderExecutedTable