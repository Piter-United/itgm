import React, { useEffect, useState, Fragment } from 'react'
import { Card, Avatar, Divider, Typography, Icon } from 'antd'
import { ProfileAvatar, Descriptions } from './atoms'

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
