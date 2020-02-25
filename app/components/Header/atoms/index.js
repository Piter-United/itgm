import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Menu, Dropdown } from 'antd'

import { Avatar } from 'ui'

import './style.css'

export const ProfileButton = ({ name = '', avatar, handleSignOut }) => {
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
    <Fragment>
      <ul className="UserMenu-Profile Header-List">
        <li className="Header-Item">
          <Link to="/user" className="Header-Link">
            <Avatar size="xs" src={avatar} />
            {name}
          </Link>
        </li>
        <li className="Header-Item">
          <Link to="/user/edit" className="Header-Link">
            Редактировать профиль
          </Link>
        </li>
        <li className="Header-Item">
          <Link to="#" onClick={handleSignOut} className="Header-Link">
            Выход
          </Link>
        </li>
      </ul>
      <Dropdown overlay={menu} className="UserMenu-Dropdown">
        <Link to="/user" className="UserMenu-Dropdown-Button">
          <Avatar size="xs" src={avatar} />
        </Link>
      </Dropdown>
    </Fragment>
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
      <li className="Header-Item">
        <a className="Header-Link" href="https://piter-united.ru/#rec162172231">
          Партнёры
        </a>
      </li>
      <li className="Header-Item">
        <a className="Header-Link" href="https://piter-united.ru/#rec134696942">
          О слете
        </a>
      </li>
    </ul>
  )
}
