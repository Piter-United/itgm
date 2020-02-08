import React, { useEffect, useState } from 'react'
import { Icon, Col, Row } from 'antd'
import find from '/asset/find.svg'
import cn from 'classnames'
import sort from '/asset/sort.svg'
import Participant from './Participant'
import ParticipantsFilter from './ParticipantsFilter'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import useStoreon from 'storeon/react'
import { GET_LIST } from 'store/participant'
import { List } from 'antd'

import './ParticipantsList.css'

const ParticipantList = () => {
  const { participant, dispatch } = useStoreon('participant')

  const [showFilter, toggleFilter] = useState(false)
  const handleToggleFilter = () => toggleFilter(!showFilter)

  const ButtonShowFilter = ({ handleOpenFilter }) => (
    <button className="participantsPage-BtnFilter" onClick={handleOpenFilter}>
      <Icon type="search" style={{ fontSize: '20px' }} />
      <Icon type="filter" style={{ fontSize: '20px', marginLeft: '10px' }} />
    </button>
  )

  let filtered = participant.list

  if (participant.community !== '') {
    const filterByCommunity = createFilterByCommunity(participant.community)
    filtered = filtered.filter(filterByCommunity)
  }
  if (participant.filter) {
    const filter = createFilter(participant.filter)
    filtered = filtered.filter(filter)
  }

  const countFilteredRecords = filtered.length
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <InnerPageContentContainer>
      <br />
      <div className="participantList">
        <Row type="flex" justify="center">
          <Col
            lg={24}
            xl={showFilter ? 16 : 18}
            className={cn({
              participantsPageWrapperContent: true,
              participatnsPageWrapperContentPadding: showFilter
            })}
          >
            <div className="participantList__header">
              <h2 className="participantList__title">Участники конференции</h2>
              <p className="participantList__count">({countFilteredRecords})</p>
              {!showFilter ? (
                <ButtonShowFilter handleOpenFilter={handleToggleFilter} />
              ) : null}
            </div>
            <List
              loading={participant.loading}
              dataSource={filtered}
              renderItem={item => <Participant key={item.id} item={item} />}
            />
          </Col>
          <Col
            className={cn({
              participantsFilter: true,
              participantsFilter_visible: !showFilter
            })}
            lg={24}
            xl={8}
          >
            <ParticipantsFilter handleClose={handleToggleFilter} />
          </Col>
        </Row>
      </div>
    </InnerPageContentContainer>
  )
}

const createFilterByCommunity = community => {
  return item => {
    return item.community.id === community
  }
}

const createFilter = filter => {
  const filterLow = filter.toLowerCase()
  return participant => {
    const data = [participant.name].join(' ').toLowerCase()
    return data.indexOf(filterLow) !== -1
  }
}

export default ParticipantList
