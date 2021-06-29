import { FC } from 'react'
import { Provider } from 'react-redux'

import { Layout } from 'antd'

import OaNav from './components/OaNav'
import OaHeader from './components/OaHeader'
import LogIn from './pages/LogIn'

import configStore from './store'
import { updateInfo } from './actions/UserInfo'

import CompanyList from './pages/Company/CompanyList'

import './App.css'

const store = configStore()
const {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} = require("react-router-dom")


const { Content, Footer } = Layout

interface PropInter {
  path: string
  children: JSX.Element
}

function PrivateRoute(props: PropInter) {
  const isLogin = store.getState().UserInfo.isLogin;
  if (!isLogin) {
    return (
      <Redirect from={props.path} to='/signin' />
    )
  } else {
    return (
      <Route path={props.path}>{ props.children }</Route>
    )
  }
}

const App: FC = () => {
  const userInfo = localStorage.getItem('user')
  if (!!userInfo) {
    store.dispatch(updateInfo(JSON.parse(userInfo)));
  }
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <LogIn />
          </Route>
          <PrivateRoute  path="/">
            <Layout style={{ minHeight: '100vh' }}>
              <OaNav />
              <Layout className="site-layout">
                <OaHeader />
                <Content style={{ margin: '0 16px' }}>
                  <Route path="/company/list">
                    <CompanyList />
                  </Route>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              </Layout>
            </Layout>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
