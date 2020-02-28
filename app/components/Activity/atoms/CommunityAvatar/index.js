import React from 'react'
import { Avatar } from 'components/ui'

import imageAvatar from 'asset/communityFallbackAvatar.png'
import './style.css'

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
