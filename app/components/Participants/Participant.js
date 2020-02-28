import React from 'react'

import { Avatar } from 'components/UI'

import './Participant.css'

const Participant = ({ item }) => (
  <li className="participant" key={item.id}>
    <div className="participant__avatar">
      <Avatar type={'participant'} src={item.avatar} alt={item.name} />
    </div>
    <h3 className="participant__name">{item.name}</h3>
    <p className="participant__community">{item.community.name}</p>
  </li>
)

export default Participant
