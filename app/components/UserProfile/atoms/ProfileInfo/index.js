import React, { Fragment } from 'react'
import { Avatar, Icon } from 'antd'
import './style.css'

const defaultAboutText =
  'Пара слов об участнике, которые он написал или не написал при регистрации. Об интересах, сфере деятельности, целях и т.д.'

const AboutUser = ({ text = defaultAboutText }) => (
  <p className="ProfileInfo_about">{text}</p>
)

const ProfileAvatar = ({ avatar }) => {
  return (
    <div className="ProfileAvatar">
      {avatar ? (
        <Avatar
          className="ProfileAvatar_image"
          alt="Avatar"
          src={`https://www.gravatar.com/avatar/${avatar}`}
        />
      ) : (
        <Fragment>
          <Avatar
            alt="Avatar"
            icon="user"
            className="ProfileAvatar_image"
            style={{ fontSize: '70px', backgroundColor: '#46325e' }}
          />
          <Icon type="camera" className="ProfileAvatar_camera" />
        </Fragment>
      )}
    </div>
  )
}

const Descriptions = ({ name, company, email, phone, about }) => {
  return (
    <div className="ProfileDescription">
      <h3 className="ProfileDescription_name">{name}</h3>
      <p className="ProfileDescription_company">{company}</p>
      <address className="ProfileContacts">
        <span className="ProfileContacts_email">{email}</span>
        <span className="ProfileContacts_phone">{phone}</span>
      </address>
      <AboutUser text={about} />
    </div>
  )
}

const ProfileInfo = props => {
  const {
    email,
    phone,
    name,
    company,
    about,
    id,
    specialization,
    photo,
    avatar_hash
  } = props

  return (
    <div className="ProfileInfo">
      <ProfileAvatar avatar={avatar_hash} />
      <Descriptions {...props} />
    </div>
  )
}

export default ProfileInfo
