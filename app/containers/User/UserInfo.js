import React, { useEffect, useState } from 'react'
import { Card, Avatar, Divider, Typography, Icon } from 'antd'
import './UserInfo.css'

const UserInfo = props => {
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

  const defaultTextAbout =
    'Пара слов об участнике, которые он написал или не написал при регистрации. Об интересах, сфере деятельности, целях и т.д.'
  const UserPhoto = () => {
    //TODO: should be src for photo
    const defaultSize = 80
    return (
      <div className="profile-photo">
        {avatar_hash ? (
          <Avatar
            className="photo"
            size={defaultSize}
            src={`https://www.gravatar.com/avatar/${avatar_hash}`}
          />
        ) : (
          <>
            <Avatar icon="user" size={defaultSize} className="photo" />
            <Icon type="camera" className="camera" />
          </>
        )}
      </div>
    )
  }
  const Descriptions = () => {
    return (
      <div className="profile-info__description">
        <h3>{name}</h3>
        <p>{company}</p>
        <div className="profile-info__contacts">
          <span>{email}</span>
          <span>{phone}</span>
        </div>
        <p className="profile-info__about">{about || defaultTextAbout}</p>
      </div>
    )
  }
  return (
    <Card
      bordered={false}
      className="profile-info"
      style={{ paddingTop: '2rem' }}
    >
      <UserPhoto />
      <Descriptions />
    </Card>
  )
}

export default UserInfo
