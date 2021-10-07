import { ethers } from 'ethers'
import { getMasterchefContract } from 'utils/contractHelpers'

interface Call {
  pid: any // farm id
  address: string // address of user
}

const getBalance = async <T = any>(calls: Call): Promise<T> => {
  try {
    const masterChefContract = getMasterchefContract()
    const returnData = await masterChefContract.pendingCrss(calls.pid, calls.address)

    return returnData
  } catch (error) {
    throw new Error(error)
  }
}

export default getBalance
