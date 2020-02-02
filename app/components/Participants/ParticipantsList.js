import React from 'react'
import { Icon } from 'antd'

import find from '/asset/find.svg'
import sort from '/asset/sort.svg'
import Participant from './Participant'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import useStoreon from 'storeon/react'

import './ParticipantsList.css'

// <pre>{JSON.stringify(participant, null, "\t")}</pre>
const ParticipantList = () => {
  const { participant, dispatch } = useStoreon('participant')
  return (
    <InnerPageContentContainer>
      <pre>participant: {JSON.stringify(participant, null, '\t')}</pre>
      <br />
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
          {participant.list.map(participant => (
            <Participant {...participant} key={participant.id} />
          ))}
        </ul>
      </div>
    </InnerPageContentContainer>
  )
}

export default ParticipantList
