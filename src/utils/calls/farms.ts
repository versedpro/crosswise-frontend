import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL, DEFAULT_REFERRER_ADDRESS } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount, referrer) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  // if (pid === 0) {
  //   const tx = await masterChefContract.enterStaking(value, options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }
  let referrerAddress = referrer
  if (!referrer) referrerAddress = DEFAULT_REFERRER_ADDRESS

  // Consider auto-compound and vesting feature for deposit method
  const tx = await masterChefContract.deposit(pid, value, referrerAddress, false, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking(value, options)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.withdraw(pid, value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  if (pid === 0) {
    const tx = await await masterChefContract.leaveStaking('0', options)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, '0', options)
  const receipt = await tx.wait()
  return receipt.status
}
