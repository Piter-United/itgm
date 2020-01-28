import React from 'react'
import Avatar from '../../../UI/Avatar'

import './style.css'

export const Participants = ({ data }) =>
  data.length > 0 && (
    <ul className="Participants">
      {data.map(({ id }) => (
        <li className="Participants__Item" key={id}>
          <Avatar type="user" size="s" alt={id} />
        </li>
      ))}
    </ul>
  )
