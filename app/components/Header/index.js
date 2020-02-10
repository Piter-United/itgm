import React, { useCallback, useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Link } from 'react-router-dom'

import './style.css'

import { LOGOUT } from 'store/user'

import { Button } from 'ui'
import SearchIcon from 'icons/search.svg'
import Bell from 'icons/bell.svg'
import { ProfileButton, HeaderList } from './atoms'

import { Logo } from 'components/Logo'

import routes from '../../routes'

const Header = ({ theme = 'default' }) => {
  const { user, dispatch } = useStoreon('user')

  const signOut = useCallback(() => {
    dispatch(LOGOUT)
  }, [dispatch])

  return (
    <header className={`Header Header_theme_${theme}`}>
      <div className="Header-Container">
        <Link className="Header-Logo" to="/">
          <Logo theme={theme} />
        </Link>
        <HeaderList routes={routes} />
        <div className="Header-UserMenu">
          <button type="button" className="Header-Icon">
            <SearchIcon />
          </button>
          <button type="button" className="Header-Icon Header-Icon_mr_m">
            <Bell />
          </button>
          {user ? (
            <ProfileButton handleSignOut={signOut} avatar={user.avatar_hash} />
          ) : (
            <Button
              color="secondary"
              text="Войти"
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
