import React, { useEffect, useState, Fragment } from 'react'
import { Card, Avatar, Divider, Typography, Icon } from 'antd'
import './style.css'

const defaultAboutText =
  'Пара слов об участнике, которые он написал или не написал при регистрации. Об интересах, сфере деятельности, целях и т.д.'

const AboutUser = ({ text = defaultAboutText }) => (
  <p className="ProfileInfo__about">{text}</p>
)

const ProfileAvatar = ({ avatar }) => {
  return (
    <div className="ProfileAvatar">
      {avatar ? (
        <Avatar
          className="ProfileAvatar__image"
          alt="Avatar"
          src={`https://www.gravatar.com/avatar/${avatar}`}
        />
      ) : (
        <Fragment>
          <Avatar
            alt="Avatar"
            icon="user"
            className="ProfileAvatar__image"
            style={{ fontSize: '70px', backgroundColor: '#46325e' }}
          />
          <Icon type="camera" className="ProfileAvatar__camera" />
        </Fragment>
      )}
    </div>
  )
}

const Descriptions = ({ name, company, email, phone, about }) => {
  return (
    <div className="ProfileDescription">
      <h3 className="ProfileDescription__name">{name}</h3>
      <p className="ProfileDescription__company">{company}</p>
      <address className="ProfileContacts">
        <span className="ProfileContacts__email">{email}</span>
        <span className="ProfileContacts__phone">{phone}</span>
      </address>
      <AboutUser text={about} />
    </div>
  )
}

export { ProfileAvatar, Descriptions }
