import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

import SearchIcon from 'icons/search.svg'
import Bell from 'icons/bell.svg'
import UserIcon from 'icons/user-icon.svg'

import { Logo } from 'components/Logo'

const linkList = ['Главная', 'Программа', 'Сообщества', 'Участники', 'Партнеры']

const HeaderList = () => {
  return (
    <ul className="Header-List">
      {linkList.map(link => (
        <li className="Header-Item" key={link}>
          <a className="Header-Link">{link}</a>
        </li>
      ))}
    </ul>
  )
}

const Header = ({ theme = 'default' }) => {
  return (
    <header className={`Header Header_theme_${theme}`}>
      <div className="Header-Container">
        <Link to="/">
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
