import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Typography, Divider } from 'antd'
import useStoreon from 'storeon/react'
import moment from 'moment'
import cn from 'classnames'

import { ButtonLink } from '../UI'
import '../Heading/Heading.css'
import './ActivityList.css'

import { GET_LIST, LIKE, UNLIKE } from 'store/activity'

import history from '../../history'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const { Title } = Typography

const onHandlerClick = (userId, item, dispatch) => {
  if (!userId) {
    return history.push('/login')
  }
  if (item.likes.isLike) {
    return dispatch(UNLIKE, item.likes.id)
  }
  return dispatch(LIKE, item.id)
}

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

const RenderDiscussion = ({ userId, user }) => {
  if (userId) {
    if (user) {
      return <ButtonLink text="Добавить Тему" href="/activity/new" />
    }
    return <ButtonLink text="Добавить Тему" href="/user/edit" />
  }
  return <ButtonLink text="Добавить Тему" href="/login" />
}

const ActivityListSection = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <div className="content">
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Col span={24}>
          <Title className="heading heading_level_1">
            Программа обсуждений
          </Title>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={activity.list.slice(0, 3)}
            renderItem={item => (
              <ShowItem
                key={item.id}
                userId={userId}
                item={item}
                dispatch={dispatch}
              />
            )}
          />
        </Col>
      </Row>
    </div>
  )
}

const ActivityListPage = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )
  const countActivityRecords = activity.list.length

  const [showFilter, toggleFilter] = useState(false)

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <div className="content">
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Col span={18} offset={3}>
          <Title className="heading heading_level_1">
            Программа обсуждений
            <span style={{ color: '#ABABAB', fontWeight: '300' }}>
              {' '}
              ({countActivityRecords})
            </span>
          </Title>
        </Col>
      </Row>
      <Row
        style={{ display: 'flex', alignItems: 'baseline', marginTop: '20px' }}
      >
        <Col
          span={18}
          offset={3}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <RenderDiscussion userId={userId} user={user} />
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              outline: 'none'
            }}
            onClick={() => toggleFilter(!showFilter)}
          >
            <Icon type="search" style={{ fontSize: '20px' }} />
            <Icon
              type="filter"
              style={{ fontSize: '20px', marginLeft: '10px' }}
            />
          </button>
        </Col>
      </Row>
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Col span={18} offset={3}>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={activity.list}
            renderItem={item => (
              <ShowItem
                key={item.id}
                userId={userId}
                item={item}
                dispatch={dispatch}
              />
            )}
          />
        </Col>
      </Row>
    </div>
  )
}

export const WrappedActivityList = () => (
  <InnerPageContentContainer>
    <ActivityListPage />
  </InnerPageContentContainer>
)

export default ActivityListSection
