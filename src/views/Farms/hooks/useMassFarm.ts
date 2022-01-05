import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
import { sendTransactionByBiconomy } from 'utils/useBiconomy'
import masterChef from 'config/abi/masterchef.json'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { DEFAULT_REFERRER_ADDRESS, DEFAULT_TOKEN_DECIMAL } from 'config'

const useMassFarm = () => {
  const masterChefContract = useMasterchef()
  const { account } = useWeb3React()

  const massHarvest = useCallback(
    async (library: any, pids: number[]) => {
      const status = await sendTransactionByBiconomy(
        library,
        masterChefContract.address,
        masterChef,
        account,
        'massHarvest',
        [pids],
      )
      return status
    },
    [account, masterChefContract],
  )

  const massStakeReward = useCallback(
    async (library: any, pids: number[]) => {
      const status = await sendTransactionByBiconomy(
        library,
        masterChefContract.address,
        masterChef,
        account,
        'massStakeReward',
        [pids],
      )
      return status
    },
    [account, masterChefContract],
  )

  return { onMassHarvest: massHarvest, onMassStakeReward: massStakeReward }
}

export default useMassFarm
