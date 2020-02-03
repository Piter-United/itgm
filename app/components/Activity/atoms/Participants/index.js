import React from 'react'
import Avatar from '../../../UI/Avatar'

import imageAvatar from '../../../../../asset/userFallbackAvatar.png'
import './style.css'

export const Participants = ({ data }) =>
  data.length > 0 && (
    <ul className="Participants">
      {data.map(({ id }) => (
        <li className="Participants-Item" key={id}>
          <Avatar type="user" size="s" alt={id} src={imageAvatar} />
        </li>
      ))}
    </ul>
  )
