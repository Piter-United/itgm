import React, { useEffect } from 'react'
import { Icon } from 'antd'

import find from '../../asset/find.svg'
import sort from '../../asset/sort.svg'
import Avatar from '../UI/Avatar/index'

import './Participants.css'

const participants = [
  {
    id: 1,
    avatar: 'img.jpeg',
    firstName: 'Иван',
    lastName: 'Иванов',
    community: 'PiterJS'
  },
  {
    id: 2,
    avatar: 'img.jpeg',
    firstName: 'Иван',
    lastName: 'Иванов',
    community: 'SPb Python Community'
  },
  {
    id: 3,
    avatar: 'img.jpeg',
    firstName: 'Иван',
    lastName: 'Иванов',
    community: 'UX Analytics'
  }
]

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

const ParticipantList = () => (
  <div className="participants">
    <div className="participants__header">
      <h2 className="participants__title">Участники конференции</h2>
      <p className="participants__count">(789)</p>
      <Icon
        className="participants__find"
        style={{ fontSize: 20 }}
        component={find}
      />
      <Icon style={{ fontSize: 24 }} component={sort} />
    </div>
    <ul className="participants__list">
      {participants.map(participant => (
        <Participant {...participant} key={participant.id} />
      ))}
    </ul>
  </div>
)

export default ParticipantList
