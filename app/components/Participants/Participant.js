import React from 'react'

import Avatar from 'ui/Avatar'

import './Participant.css'

const Participant = ({ id, avatar, firstName, lastName, community }) => (
  <li className="participant" key={id}>
    <div className="participant__avatar">
      <Avatar
        type={'participant'}
        src={avatar}
        alt={`${firstName}
        ${lastName}`}
      />
    </div>
    <h3 className="participant__name">{`${firstName} ${lastName}`}</h3>
    <p className="participant__community">{community}</p>
  </li>
)

export default Participant
