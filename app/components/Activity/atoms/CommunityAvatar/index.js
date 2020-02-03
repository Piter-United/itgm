import React from 'react'

import './style.css'
import Avatar from '../../../UI/Avatar'
import imageAvatar from '../../../../../asset/communityFallbackAvatar.png'

export const CommunityAvatar = ({ name, src = imageAvatar }) => (
  <div className="CommunityAvatar">
    <Avatar
      alt="name"
      type="community"
      size="m"
      className="CommunityAvatar-Avatar"
      src={src}
    />
    <p className="CommunityAvatar-Description">{name}</p>
  </div>
)
