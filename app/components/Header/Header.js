import React, { useState } from 'react'
import { withRouter, Link, matchPath } from 'react-router-dom'
import useStoreon from 'storeon/react'
import { Layout, Menu } from 'antd'
import { LOGOUT } from '../../store/user'

import Logo from '../Logo/Logo'
import Mainmenu from '../Mainmenu/Mainmenu'
import UserMenu from '../usermenu/usermenu'
import Burger from '../Burger/Burger'

import '../main-nav.css'
import '../main-menu.css'

const { Header } = Layout

const hasMatchRoute = (path, url, exact = true) => {
  const m = matchPath(path, {
    path: url,
    exact,
    strict: false
  })
  return m && 'path' in m
}

export default props => {
  const { theme } = props
  // const { userId, user, dispatch } = useStoreon('user', 'userId')
  // const themeMenu = hasMatchRoute(path, '/') ? 'dark' : null

  const [isMenuOpen, openMenu] = useState(false)

  const clickOnBurger = () => {
    openMenu(!isMenuOpen)
    const body = document.body
    body.classList.toggle('menu-is-open')
  }

  return (
    <Header className="main-nav">
      <div className="main-nav__logo">
        <Logo theme={theme} />
      </div>
      <Mainmenu {...props} />
      <UserMenu {...props} />

      <div className="main-nav__menu-switcher">
        <Burger theme="dark" onClick={clickOnBurger} />
      </div>
    </Header>
  )
}
