import { FC, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { httpPost } from '../../helper/request'
import { RootState } from '../../reducers'
import { updateInfo } from '../../actions/UserInfo'

import './index.sass'

const { useHistory } = require('react-router-dom')

const LogIn: FC = () => {

  interface formValues {
    username: string
    password: string
    remember: boolean
  }

  let history = useHistory()

  const userInfo = useSelector((state: RootState) => state.UserInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo.isLogin) {
      history.push('/')
    }
  }, [history, userInfo.isLogin])

  const onFinish = async (values: formValues) => {
    const res = await httpPost('/account/login/', values)
    localStorage.setItem('user', JSON.stringify(res.data))
    dispatch(updateInfo(res.data));
    history.push('/')
  }

  return (
    <div className="login-root">
      <div className="login-form">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          onFinish={e => onFinish(e)}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4}}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4}}>
            <Button type="primary" htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LogIn
