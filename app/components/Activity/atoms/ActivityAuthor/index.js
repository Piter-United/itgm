import React from 'react'
import moment from 'moment'
import './style.css'

import { Avatar } from 'ui'

export const ActivityAuthor = ({ user, avatar, community, createdAt }) => {
  const date = moment(createdAt).format('L')
  const time = moment(createdAt).format('LT')
  return (
    <div className="ActivityAuthor">
      <Avatar
        type="user"
        size="xs"
        src={avatar}
        alt={user}
        className="ActivityAuthor-Avatar"
      />
      <div>
        <p className="ActivityAuthor-Name">
          {user}
          {community && `, ${community}`}
        </p>
        <p className="ActivityAuthor-Date">{`Создана ${date} в ${time}`}</p>
      </div>
    </div>
  )
}
