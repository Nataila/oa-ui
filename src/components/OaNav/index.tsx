import { FC, useState } from 'react'

import { Layout, Menu } from 'antd'

import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { NavLink } = require('react-router-dom')
const { Sider } = Layout
const { SubMenu } = Menu

const OaNav: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectKey] = useState<string>(window.location.pathname)
  const [openKey] = useState<string>(window.location.pathname.split('/')[1])
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={v => setCollapsed(!collapsed)}>
      <div className="logo" />
      <Menu theme="dark" defaultOpenKeys={[openKey]} defaultSelectedKeys={[selectKey]} mode="inline">
        <Menu.Item key="task-list" icon={<FileOutlined />}>
          任务列表
        </Menu.Item>
        <SubMenu key="user" icon={<UserOutlined />} title="用户管理">
          <Menu.Item key="addUser">添加用户</Menu.Item>
          <Menu.Item key="userList">
            <NavLink to="/user/list/">
              用户列表
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="company" icon={<TeamOutlined />} title="企业管理">
          <Menu.Item key="/company/list/">
            <NavLink to="/company/list/">
            企业列表
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/company/check/">
            <NavLink to="/company/check/">
            企业审核
            </NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default OaNav
