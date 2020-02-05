import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import SearchIcon from 'icons/search.svg'
import Bell from 'icons/bell.svg'
import UserIcon from 'icons/user-icon.svg'

import { Logo } from 'components/Logo'

import routes from '../../routes'

const HeaderList = () => {
  return (
    <ul className="Header-List">
      {routes
        .filter(v => v.inHeader)
        .map(({ path, title }) => (
          <li className="Header-Item" key={path}>
            <Link className="Header-Link" to={path}>
              {title}
            </Link>
          </li>
        ))}
    </ul>
  )
}

const Header = ({ theme = 'default' }) => {
  return (
    <header className={`Header Header_theme_${theme}`}>
      <div className="Header-Container">
        <Link className="Header-Logo" to="/">
          <Logo theme={theme} />
        </Link>
        <HeaderList />
        <div className="Header-UserMenu">
          <button type="button" className="Header-Icon">
            <SearchIcon />
          </button>
          <button type="button" className="Header-Icon">
            <Bell />
          </button>
          <a className="Header-Icon">
            <UserIcon />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
