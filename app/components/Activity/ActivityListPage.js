import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import cn from 'classnames'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Typography, Divider } from 'antd'
import ActivityFilter from './ActivityFilter'
import { Button as ButtonCustom } from '../UI'
import { GET_LIST } from 'store/activity'

const { Title } = Typography

const RenderDiscussion = ({ userId, user }) => {
  if (userId) {
    if (user) {
      return (
        <ButtonCustom type="link" text="Добавить Тему" href="/activity/new" />
      )
    }
    return <ButtonCustom type="link" text="Добавить Тему" href="/user/edit" />
  }
  return <ButtonCustom type="link" text="Добавить Тему" href="/login" />
}
const ButtonShowFilter = ({ handleOpenFilter }) => (
  <button className="ActivityPage-BtnFilter" onClick={handleOpenFilter}>
    <Icon type="search" style={{ fontSize: '20px' }} />
    <Icon type="filter" style={{ fontSize: '20px', marginLeft: '10px' }} />
  </button>
)

export const ShowItem = ({ dispatch, item, userId }) => (
  <List.Item className="ActivityListItem" key={item.id}>
    <div>
      <div className="ActivityListItem-Misc">
        <span>{moment(item.ts).format('DD.MM.YYYY')}</span>
        <div>
          {item.community &&
            item.community.resource &&
            item.community.resource.name}{' '}
        </div>
      </div>
      <Link className="ActivityListItem-TitleLink" to={`/activity/${item.id}`}>
        {item.resource.name}
      </Link>
    </div>
    <div className="ActivityListItem-Description">
      {item.resource.description}
    </div>
    <div className="ActivityListItem-Footer">
      <div className="ActivityListItem-Likes" key={`list-item-like-${item.id}`}>
        <Icon
          onClick={() => onHandlerClick(userId, item, dispatch)}
          type="heart"
          theme={item.likes.isLike ? 'filled' : ''}
          className={cn({
            'ActivityListItem-LikeIcon': true,
            'ActivityListItem-LikeIcon_islike_true': item.likes.isLike
          })}
        />{' '}
        <span className="ActivityListItem-LikeCounter">{`(${item.likes.count})`}</span>
      </div>
      <span className="ActivityListItem-Author">
        Автор: {item.resource.user.id}
      </span>
    </div>
  </List.Item>
)

const ActivityListPage = props => {
  console.log('ActivityListPage', props)
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )
  const countActivityRecords = activity.list.length
  const countTags = activity.tags.length
  const [showFilter, toggleFilter] = useState(false)
  const handleToggleFilter = () => toggleFilter(!showFilter)

  let filtered = activity.list

  if (activity.community !== '') {
    const filterByCommunity = createFilterByCommunity(activity.community)
    filtered = filtered.filter(filterByCommunity)
  }
  if (countTags) {
    const filterByTag = createFilterByTag(activity.tags)
    filtered = filtered.filter(filterByTag)
  }
  if (activity.filter) {
    const filter = createFilter(activity.filter, activity.tags)
    filtered = filtered.filter(filter)
  }

  const countFilteredRecords = filtered.length
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <div className="content">
      <Row type="flex" justify="center">
        <Col
          lg={24}
          xl={showFilter ? 16 : 18}
          className="ActivityPage-WrapperContent"
        >
          <div
            className={cn({
              'ActivityPage-Content': true,
              'ActivityPage-Content_filter_show': showFilter
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
              <RenderDiscussion userId={userId} user={user} />
              {!showFilter ? (
                <ButtonShowFilter handleOpenFilter={handleToggleFilter} />
              ) : null}
            </Row>
            <Divider />
            <List
              itemLayout="vertical"
              size="large"
              pagination={false}
              loading={activity.loading}
              dataSource={filtered}
              renderItem={item => (
                <ShowItem
                  key={item.id}
                  userId={userId}
                  item={item}
                  dispatch={dispatch}
                />
              )}
            />
          </div>
        </Col>
        <Col
          className={cn({
            ActivityFilter: true,
            ActivityFilter_visible: !showFilter
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

const createFilterByCommunity = community => {
  return item => {
    return item.resource.community.id === community
  }
}

const createFilterByTag = tags => {
  return activity => {
    return !!activity.resource.tags.filter(tag => tags.indexOf(tag) !== -1)
      .length
  }
}

const createFilter = (filter, tags) => {
  const filterLow = filter.toLowerCase()
  return activity => {
    const data = [activity.resource.name, activity.resource.description]
      .join(' ')
      .toLowerCase()
    return data.indexOf(filterLow) !== -1
  }
}

export default ActivityListPage
