import React from 'react'
import moment from 'moment'
import './style.css'

import Avatar from 'ui/Avatar'

export const ActivityAuthor = ({ user, community, createdAt }) => {
  const date = moment(createdAt).format('L')
  const time = moment(createdAt).format('LT')
  return (
    <div className="ActivityAuthor">
      <Avatar
        type="user"
        size="xs"
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
