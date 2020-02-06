import React from 'react'
import { Button, Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import Avatar from 'ui/Avatar'
import UserIcon from 'icons/user-icon.svg'

export const SignUpButton = () => (
  <Link to="/login">
    <Button>Sign Up</Button>
  </Link>
)
export const ProfileButton = ({ avatar, handleSignOut }) => {
  const menu = (
    <Menu>
      <Menu.Item onClick={handleSignOut} key="signOut">
        Sign out
      </Menu.Item>
      <Menu.Item key="edit">
        <Link to="/user/edit">Edit profile</Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <Button shape="circle">
        {avatar ? (
          <Link to="/user">
            <Avatar
              size="xs"
              src={`https://www.gravatar.com/avatar/${avatar}`}
            />
          </Link>
        ) : (
          <Link to="/user">
            <UserIcon />
          </Link>
        )}
      </Button>
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
