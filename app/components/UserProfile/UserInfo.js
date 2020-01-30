import React, { useEffect, useState, Fragment } from 'react'
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
      <div className="Profile-photo">
        {avatar_hash ? (
          <Avatar
            className="photo"
            size={defaultSize}
            src={`https://www.gravatar.com/avatar/${avatar_hash}`}
          />
        ) : (
          <Fragment>
            <Avatar
              icon="user"
              size={defaultSize}
              className="photo"
              style={{ fontSize: '70px', backgroundColor: '#46325e' }}
            />
            <Icon type="camera" className="camera" />
          </Fragment>
        )}
      </div>
    )
  }
  const Descriptions = () => {
    return (
      <div className="Profile-info__description">
        <h3>{name}</h3>
        <p>{company}</p>
        <div className="Profile-info__contacts">
          <span>{email}</span>
          <span>{phone}</span>
        </div>
        <p className="Profile-info__about">{about || defaultTextAbout}</p>
      </div>
    )
  }
  return (
    <Card bordered={false} className="Profile-info">
      <UserPhoto />
      <Descriptions />
    </Card>
  )
}

export default UserInfo
