import React from 'react'

import './Header.css'
import Logo from '../Logo/Logo'

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

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-Container">
        <Logo />
        {HeaderList()}
        <div className="Header-UserMenu">
          <button type="button" className="Header-Search" />
          <button type="button" className="Header-Notification" />
          <button type="button" className="Header-Avatar" />
        </div>
      </div>
    </div>
  )
}

export default Header
