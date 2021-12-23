import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
import { sendTransactionByBiconomy } from 'utils/useBiconomy'
import masterChef from 'config/abi/masterchef.json'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_REFERRER_ADDRESS } from 'config'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()
  const { account } = useWeb3React()

  // const handleStake = useCallback(
  //   async (amount: string, referrer?: string) => {
  //     // const txHash = await stakeFarm(masterChefContract, pid, amount, referrer)
  //     const txHash = await sendTransactionByBiconomy('', '', '', '', '')
  //     console.info(txHash)
  //   },
  //   [masterChefContract, pid],
  // )

  const handleStake = useCallback(
    async (amount: string, library: any, referrer?: string) => {
      let referrerAddress = referrer
      if (!referrer) referrerAddress = DEFAULT_REFERRER_ADDRESS
      // const txHash = await stakeFarm(masterChefContract, pid, amount, referrer)
      const txHash = await sendTransactionByBiconomy(
        library,
        masterChefContract.address,
        masterChef,
        account,
        'deposit',
        [pid, amount, referrerAddress, false, false],
      )
      console.info(txHash)
    },
    [pid, masterChefContract, account],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
