import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useMasterchef } from 'hooks/useContract'

// const getStakedCrss = async (masterChefContract, pid, account) => {
//   const stakedCrss = await masterChefContract.
// }

// const useStakedCrss = (_pid = 0) => {
//   const { account } = useWeb3React()
//   const masterChefContract = useMasterchef()

//   const handleStakedCrss = useCallback(
//     async() => {
//       await getStakedCrss(masterChefContract)
//     }
//   )
// }
