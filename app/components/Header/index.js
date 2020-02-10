import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import SearchIcon from 'icons/search.svg'
import Bell from 'icons/bell.svg'
import { SignUpButton, ProfileButton, HeaderList } from './atoms'

import { Logo } from 'components/Logo'

import routes from '../../routes'
import { GET_CURRENT_USER, LOGOUT } from 'store/user'
import useStoreon from 'storeon/react'

const Header = ({ theme = 'default' }) => {
  const { user, token, dispatch } = useStoreon('user', 'token')
  const signOut = () => dispatch(LOGOUT)
  useEffect(() => {
    dispatch(GET_CURRENT_USER)
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
          <button type="button" className="Header-Icon">
            <Bell />
          </button>
          {token ? (
            user ? (
              <ProfileButton avatar={user.avatar} handleSignOut={signOut} />
            ) : (
              <ProfileButton handleSignOut={signOut} />
            )
          ) : (
            <SignUpButton />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
