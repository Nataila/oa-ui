interface infoProps {
  username: string
  token: string
}

export const updateInfo = (userInfo: infoProps) => {
  return {
    type: 'UPDATE',
    userInfo
  }
}

export const clearInfo = {
  type: 'CLEAR'
}