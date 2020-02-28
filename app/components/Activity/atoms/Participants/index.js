import React from 'react'
import { Avatar } from 'components/UI'

import './style.css'

export const Participants = ({ data }) =>
  data.length > 0 && (
    <ul className="Participants">
      {data.map(({ id, avatar, name }) => (
        <li className="Participants-Item" key={id}>
          <Avatar type="user" size="xs" alt={name} src={avatar} />
        </li>
      ))}
    </ul>
  )
