const initState = {isLogin: false}

function UserInfo(state = initState, action:any) {
  switch (action.type) {
    case 'UPDATE':
      return Object.assign({}, state, action.userInfo, {isLogin: true})
    case 'CLEAR':
      return {}
    default:
      return state
  }
}

export default UserInfo
