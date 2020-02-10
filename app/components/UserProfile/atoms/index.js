import React, { Fragment } from 'react'
import { Avatar, Icon } from 'antd'
import './style.css'

const defaultAboutText =
  'Пара слов об участнике, которые он не написал при регистрации. Об интересах, сфере деятельности, целях и т.д.'

const AboutUser = ({ text = defaultAboutText }) => (
  <p className="ProfileInfo-About">{text}</p>
)

const ProfileAvatar = ({ avatar }) => {
  return (
    <div className="ProfileAvatar">
      {avatar ? (
        <Avatar className="ProfileAvatar-Image" alt="Avatar" src={avatar} />
      ) : (
        <Fragment>
          <Avatar
            alt="Avatar"
            icon="user"
            className="ProfileAvatar-Image"
            style={{ fontSize: '70px', backgroundColor: '#46325e' }}
          />
          <Icon type="camera" className="ProfileAvatar-Camera" />
        </Fragment>
      )}
    </div>
  )
}

const Descriptions = ({ name, company, email, phone, about }) => {
  return (
    <div className="ProfileDescription">
      <h3 className="ProfileDescription-Name">{name}</h3>
      <p className="ProfileDescription-Company">{company}</p>
      <address className="ProfileContacts">
        <span className="ProfileContacts-Email">{email}</span>
        <span className="ProfileContacts-Phone">{phone}</span>
      </address>
      <AboutUser text={about} />
    </div>
  )
}

const ProfileInfo = props => {
  const { avatar } = props

  return (
    <div className="ProfileInfo">
      <Descriptions {...props} />
      <ProfileAvatar avatar={avatar} />
    </div>
  )
}

export default ProfileInfo
