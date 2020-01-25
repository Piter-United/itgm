import React, { useState } from 'react'
import { withRouter, Link, matchPath } from 'react-router-dom'
import useStoreon from 'storeon/react'
import { Layout, Menu } from 'antd'
import { LOGOUT } from 'store/user'

import Logo from './Logo/Logo'
import Burger from './Burger/Burger'

import './main-nav.css'
import './main-menu.css'

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
    const themeMenu = hasMatchRoute(path, '/') ? 'dark' : null

    const [isMenuOpen, openMenu] = useState(false)

    const clickOnBurger = () => {
      openMenu(!isMenuOpen)
      const body = document.body
      body.classList.toggle('menu-is-open')
    }

    return (
      <Header className="main-nav">
        <div className="main-nav__logo">
          <Logo theme="dark" />
        </div>
        <div className={`main-nav__menu ${isMenuOpen ? 'is-open' : ''}`}>
          <Menu theme={themeMenu} selectable={false} className="main-menu">
            <Menu.Item
              className={
                hasMatchRoute(path, '/') ? 'ant-menu-item-selected' : ''
              }
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
        <div className="main-nav__user-menu">
          <button
            type="button"
            className="main-nav__search main-nav__search--theme-dark"
          />
          <button
            type="button"
            className="main-nav__notification main-nav__notification--theme-dark"
          />
          <button
            type="button"
            className="main-nav__avatar main-nav__avatar--theme-dark"
          />
        </div>
        <div className="main-nav__menu-switcher">
          <Burger theme="dark" onClick={clickOnBurger} />
        </div>
      </Header>
    )
  }
)
