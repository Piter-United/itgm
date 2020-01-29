import React from 'react'

import './Header.css'
import { Logo } from 'components/Logo'
import { Link } from 'react-router-dom'

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

const Header = ({ theme = 'inverse' }) => {
  return (
    <header className={`Header Header_theme_${theme}`}>
      <div className="Header-Container">
        <Link to="/">
          <Logo theme={theme} />
        </Link>
        <HeaderList />
        <div className="Header-UserMenu">
          <button type="button" className="Header-Search" />
          <button type="button" className="Header-Notification" />
          <button type="button" className="Header-Avatar" />
        </div>
      </div>
    </header>
  )
}

export default Header
