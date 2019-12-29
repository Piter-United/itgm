import React from 'react'
import { withRouter, Link, matchPath } from 'react-router-dom'
import useStoreon from 'storeon/react'
import { Button, Layout, Menu } from 'antd'
import { LOGOUT } from '../store/user'

const { Header } = Layout

const hasMatchRoute = (path, url, exact = true) => {
  const m = matchPath(path, {
    path: url,
    exact,
    strict: false
  })
  return m && 'path' in m
}

export default withRouter(
  ({
    history: {
      location: { pathname: path }
    }
  }) => {
    const { userId, user, dispatch } = useStoreon('user', 'userId')
    return (
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: '64px', display: 'flex' }}
        >
          <Menu.Item
            className={hasMatchRoute(path, '/') ? 'ant-menu-item-selected' : ''}
            key="1"
          >
            <Link to="/">Главная</Link>
          </Menu.Item>
          <Menu.Item
            className={
              hasMatchRoute(path, '/community', false)
                ? 'ant-menu-item-selected'
                : ''
            }
            key="2"
          >
            <Link to="/community">Сообщества</Link>
          </Menu.Item>
          {!userId && (
            <Menu.Item
              key="97"
              className={
                hasMatchRoute(path, '/login') ? 'ant-menu-item-selected' : ''
              }
              style={{ marginLeft: 'auto' }}
            >
              <Link to="/login">Вход</Link>
            </Menu.Item>
          )}
          {userId && [
            <Menu.Item
              key="98"
              className={
                hasMatchRoute(path, '/user') ? 'ant-menu-item-selected' : ''
              }
              style={{ marginLeft: 'auto' }}
            >
              {user ? (
                <Link to="/user">{user.name}</Link>
              ) : (
                <Link to="/user/edit">
                  {user ? user.name : 'Заполните профиль'}
                </Link>
              )}
            </Menu.Item>,
            <Menu.Item
              key="99"
              className={
                hasMatchRoute(path, '/logout') ? 'ant-menu-item-selected' : ''
              }
            >
              <a type="link" onClick={() => dispatch(LOGOUT)}>
                Выход
              </a>
            </Menu.Item>
          ]}
        </Menu>
      </Header>
    )
  }
)
