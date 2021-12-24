import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

export const wssNodes = [process.env.REACT_APP_WSS_NODE_1]

export const getRpcUrl = () => {
  return sample(nodes)
}

export const getWssUrl = () => {
  return sample(wssNodes)
}
