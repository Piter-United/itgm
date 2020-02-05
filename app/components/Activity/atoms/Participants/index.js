import React from 'react'
import Avatar from 'ui/Avatar'

import imageAvatar from 'asset/userFallbackAvatar.png'
import './style.css'

export const Participants = ({ data }) =>
  data.length > 0 && (
    <ul className="Participants">
      {data.map(({ id, avatar_hash, name }) => (
        <li className="Participants-Item" key={id}>
          <Avatar
            type="user"
            size="s"
            alt={name}
            src={`https://www.gravatar.com/avatar/${avatar_hash}`}
          />
        </li>
      ))}
    </ul>
  )
