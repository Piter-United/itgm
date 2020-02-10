import React from 'react'
import { Link } from 'react-router-dom'

import { Menu, Dropdown } from 'antd'

import { Avatar } from 'ui'

import './style.css'

export const ProfileButton = ({ avatar, handleSignOut }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={handleSignOut} key="signOut">
        Выход
      </Menu.Item>
      <Menu.Item key="edit">
        <Link to="/user/edit">Редактировать профиль</Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} className="Dropdown">
      <Link to="/user" className="Dropdown-Button">
        <Avatar size="xs" src={avatar} />
      </Link>
    </Dropdown>
  )
}

export const HeaderList = ({ routes }) => {
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
