import { ethers } from 'ethers'

export const sendTransactionByBiconomy = async (
  library: any,
  contractAddress: string,
  abi: any,
  account: string,
  func: string,
  params: any,
) => {
  console.log(library)
  const contract = new ethers.Contract(contractAddress, abi, library.provider.signer)

  const contractInterface = new ethers.utils.Interface(abi)

  const userAddress = account
  const { data } = await contract.populateTransaction[func](...params)
  const provider = library.provider.ethersProvider

  const gasLimit = await provider.estimateGas({
    to: contractAddress,
    from: userAddress,
    data,
  })
  console.log('gasLimit', gasLimit)

  const txParams = {
    data,
    to: contractAddress,
    from: userAddress,
    gasLimit,
    signatureType: 'EIP712_SIGN',
  }

  const tx = await library.provider.send('eth_sendTransaction', [txParams])
  console.log('transactionHash', tx)
  library.provider.once(tx, (transaction) => {
    console.log(transaction)
  })
  const receipt = tx.wait()
  return receipt.status
}
