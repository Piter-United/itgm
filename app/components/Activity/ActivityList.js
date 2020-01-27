import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Button, Typography, Divider } from 'antd'
import useStoreon from 'storeon/react'

import '../Heading/Heading.css'
import './Activity.css'

import { GET_LIST, LIKE, UNLIKE } from 'store/activity'

import history from '../../history'

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

export const ShowItem = ({ dispatch, item, userId }) => {
  const dateActivity = new Date(item.ts)
  const formatedDateCreationActivity = `
    ${dateActivity.getDate()}.
    ${dateActivity.getMonth() + 1}.
    ${dateActivity.getFullYear()}`

  return (
    <List.Item className="activity-list-item" key={item.id}>
      <div className="activity-list-item__meta">
        <div className="activity-list-item__misc">
          <span className="activity-list-item__date">
            {formatedDateCreationActivity}
          </span>
          <div className="activity-list-item__communities">
            {item.community &&
              item.community.resource &&
              item.community.resource.name}{' '}
          </div>
        </div>
        <Link
          className="activity-list-item__title-link"
          to={`/activity/${item.id}`}
        >
          {item.resource.name}
        </Link>
      </div>
      <div className="activity-list-item__description">
        {item.resource.description}
      </div>
      <div className="activity-list-item__footer">
        <div
          className="activity-list-item__likes"
          onClick={() => onHandlerClick(userId, item, dispatch)}
          key={`list-item-like-${item.id}`}
        >
          <Icon
            type="heart"
            theme={`${item.likes.isLike ? 'filled' : ''}`}
            className={`activity-list-item__like-icon
               ${
                 item.likes.isLike
                   ? 'activity-list-item__like-icon_islike'
                   : 'activity-list-item__like-icon_notlike'
               }
              `}
          />{' '}
          <span className="activity-list-item__like-counter">{`(${item.likes.count})`}</span>
        </div>
        <span className="activity-list-item__author">
          Автор: {item.resource.user.id}
        </span>
      </div>
    </List.Item>
  )
}

const RenderDiscussion = ({ userId, user }) => {
  if (userId) {
    if (user) {
      return (
        <Button icon="plus-circle" href="/activity/new">
          Добавить обсуждение
        </Button>
      )
    }
    return (
      <Button icon="plus-circle" href="/user/edit">
        Добавить обсуждение
      </Button>
    )
  }
  return (
    <Button icon="plus-circle" href="/login">
      Добавить обсуждение
    </Button>
  )
}

const ActivityList = () => {
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
        <Col span={18}>
          <Title className="heading heading_level_1">Обсуждения</Title>
        </Col>
        <Col span={6}>
          <RenderDiscussion userId={userId} user={user} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={18}>
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
        <Col span={6} />
      </Row>
    </div>
  )
}

export default ActivityList
