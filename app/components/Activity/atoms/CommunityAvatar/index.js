import React from 'react'

import './style.css'
import Avatar from '../../../UI/Avatar'

export const CommunityAvatar = ({ name }) => (
  <div className="CommunityAvatar">
    <Avatar
      alt="name"
      type="community"
      size="m"
      className="CommunityAvatar__Avatar"
    />
    <p className="CommunityAvatar__Description">{name}</p>
  </div>
)
