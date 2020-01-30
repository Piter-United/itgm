import React from 'react'
import { Icon } from 'antd'

import find from '/asset/find.svg'
import sort from '/asset/sort.svg'
import Participant from './Participant'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

import './ParticipantsList.css'

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

const ParticipantList = () => (
  <InnerPageContentContainer>
    <div className="participantList">
      <div className="participantList__header">
        <h2 className="participantList__title">Участники конференции</h2>
        <p className="participantList__count">(789)</p>
        <Icon
          className="participantList__find"
          style={{ fontSize: 20 }}
          component={find}
        />
        <Icon style={{ fontSize: 24 }} component={sort} />
      </div>
      <ul className="participantList__list">
        {participants.map(participant => (
          <Participant {...participant} key={participant.id} />
        ))}
      </ul>
    </div>
  </InnerPageContentContainer>
)

export default ParticipantList
