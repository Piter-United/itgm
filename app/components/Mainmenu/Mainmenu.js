import React, { useState } from 'react'

import { Layout, Menu } from 'antd'
import useStoreon from 'storeon/react'
import { withRouter, Link, matchPath } from 'react-router-dom'

const hasMatchRoute = (path, url, exact = true) => {
  const m = matchPath(path, {
    path: url,
    exact,
    strict: false
  })
  return m && 'path' in m
}

export const Mainmenu = withRouter(
  ({
    history: {
      location: { pathname: path }
    }
  }) => {
    const { userId, user, dispatch } = useStoreon('user', 'userId')
    const [isMenuOpen, openMenu] = useState(false)
    const themeMenu = hasMatchRoute(path, '/') ? 'dark' : null

    return (
      <div className={`main-nav__menu ${isMenuOpen ? 'is-open' : ''}`}>
        <Menu theme={themeMenu} selectable={false} className="main-menu">
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
      </div>
    )
  }
)

export default Mainmenu
