import { FC } from 'react'
import { Layout } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { clearInfo } from '../../actions/UserInfo'
import { RootState } from '../../reducers'

import './index.sass'

const { useHistory } = require('react-router-dom')
const { Header } = Layout

const OaHeader: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const username = useSelector((state: RootState)=> state.UserInfo.username)

  const logOut = async() => {
    localStorage.removeItem('user')
    dispatch(clearInfo);
    history.push('/ signin')
  }
  return (
    <Header className="site-layout-background oa-header" style={{ padding: 0 }}>
      <div style={{ float: 'right', color: '#FFF'}}>
        <span className="username">{ username }</span> <span style={{ margin: '0 10px'}}>/</span>  <span className='logout' onClick={logOut} >退出</span>
      </div>
    </Header>
  )
}

export default OaHeader;