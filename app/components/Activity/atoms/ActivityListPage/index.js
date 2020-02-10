import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import cn from 'classnames'
import { Icon, Row, Col, Typography, Divider } from 'antd'
import ActivityFilter from '../ActivityListFilter'
import { Button as ButtonCustom } from '../../../UI'
import { GET_LIST, TOGGLE_ACTIVITY_FILTER } from 'store/activity'

import '../../../Heading/Heading.css'
import '../../style.css'
import ActivityList from '../ActivityList'

const { Title } = Typography

const RenderDiscussionAdd = ({ user }) => {
  let url = '/login'
  if (user && user.community) {
    url = '/activity/new'
  } else if (user) {
    url = '/user/edit'
  }
  return <ButtonCustom asLink={true} text="Добавить Тему" url={url} />
}
const ButtonShowFilter = ({ handleOpenFilter }) => (
  <button className="ActivityPage-BtnFilter" onClick={handleOpenFilter}>
    <Icon type="search" style={{ fontSize: '20px' }} />
    <Icon type="filter" style={{ fontSize: '20px', marginLeft: '10px' }} />
  </button>
)

const filterActivities = (activityFilter, activities) => {
  let filtered = [...activities]

  if (activityFilter.communityId) {
    filtered = filtered.filter(
      ({ community: { id } }) => id === activityFilter.communityId
    )
  }
  if (activityFilter.tags.length) {
    filtered = filtered.filter(
      ({ resource: { tags } }) =>
        tags.filter(tag => activityFilter.tags.includes(tag)).length > 0
    )
  }
  if (activityFilter.searchString) {
    filtered = filtered.filter(({ resource: { name, description } }) => {
      const text = `${name} ${description}`
      const regex = RegExp(activityFilter.searchString, 'i')
      return regex.test(text)
    })
  }
  return filtered
}

const ActivityListPage = () => {
  const { user, activity, activityFilter, dispatch } = useStoreon(
    'user',
    'activity',
    'activityFilter'
  )
  const stateActivityFilter = activityFilter.state
  const handleToggleFilter = () => dispatch(TOGGLE_ACTIVITY_FILTER)

  const filtered = filterActivities(activityFilter, activity.list)
  const countFilteredRecords = filtered.length

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch, user])

  return (
    <div className="content">
      <Row type="flex" justify="center">
        <Col
          lg={24}
          xl={stateActivityFilter === 'visible' ? 16 : 18}
          className="ActivityPage-WrapperContent"
        >
          <div
            className={cn({
              'ActivityPage-Content': true,
              'ActivityPage-Content_filter_show':
                stateActivityFilter === 'visible'
            })}
          >
            <Title className="heading heading_level_1">
              Программа обсуждений
              <span style={{ color: '#ABABAB', fontWeight: '300' }}>
                {' '}
                ({countFilteredRecords})
              </span>
            </Title>
            <Row type="flex" justify="space-between">
              <RenderDiscussionAdd user={user} />
              {stateActivityFilter === 'hidden' ? (
                <ButtonShowFilter handleOpenFilter={handleToggleFilter} />
              ) : null}
            </Row>
            <Divider />
            <ActivityList
              activitiesData={{ ...activity, list: filtered }}
              dispatch={dispatch}
              userId={user?.id}
            />
          </div>
        </Col>
        <Col
          className={cn({
            ActivityFilter: true,
            ActivityFilter_visible: stateActivityFilter === 'hidden'
          })}
          lg={24}
          xl={8}
        >
          <ActivityFilter handleClose={handleToggleFilter} />
        </Col>
      </Row>
    </div>
  )
}

export default ActivityListPage
