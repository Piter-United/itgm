import React, { useCallback, useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
// import { Link } from 'react-router-dom'

import cn from 'classnames'

import './style.css'

import { LOGOUT, GET_CURRENT_USER } from 'store/user'

import { Icon } from 'antd'
import { Button } from 'components/UI'
// import SearchIcon from 'icons/search.svg'
// import Bell from 'icons/bell.svg'
import { ProfileButton, HeaderList } from './atoms'

import { Logo } from 'components/Logo'

import routes from '../../routes'

const Header = ({ theme = 'default' }) => {
  const { user, token, dispatch } = useStoreon('user', 'token')
  const [showMenu, setMenu] = useState(false)

  useEffect(() => {
    dispatch(GET_CURRENT_USER)
  }, [token, dispatch])

  const signOut = useCallback(() => {
    dispatch(LOGOUT)
  }, [dispatch])
  return (
    <header className={`Header Header_theme_${theme}`}>
      <div
        className={cn({
          'Header-Container': true,
          'Header-Container_open': showMenu
        })}
      >
        <a className="Header-Logo" href="http://piter-united.ru">
          <Logo theme={theme} />
        </a>
        <div className="Header-Burger">
          <Icon
            onClick={() => setMenu(!showMenu)}
            style={{ fontSize: '20px' }}
            type={showMenu ? 'close' : 'menu'}
          />
        </div>
        <HeaderList routes={routes} />
        <div className="Header-UserMenu">
          {/*<button type="button" className="Header-Icon">*/}
          {/*  <SearchIcon />*/}
          {/*</button>*/}
          {/*<button type="button" className="Header-Icon Header-Icon_mr_m">*/}
          {/*  <Bell />*/}
          {/*</button>*/}
          {token ? (
            <ProfileButton
              handleSignOut={signOut}
              name={user?.name}
              avatar={user?.avatar}
            />
          ) : (
            <Button
              color="secondary"
              text="Вход"
              url="/login"
              asLink
              size="s"
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
