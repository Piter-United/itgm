import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Button, Typography, Divider } from 'antd'
import useStoreon from 'storeon/react'

import '../Heading/Heading.css'

import { GET_LIST, LIKE, UNLIKE, ON_FILTER } from '../../store/activity'

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

export const ShowItem = ({ dispatch, item, userId }) => (
  <List.Item
    key={item.id}
    actions={[
      <span
        onClick={() => onHandlerClick(userId, item, dispatch)}
        key={`list-item-like-${item.id}`}
      >
        <Icon
          type="like-o"
          style={{ color: item.likes.isLike ? '#1890ff' : '' }}
        />{' '}
        {item.likes.count}
      </span>
    ]}
  >
    <List.Item.Meta
      title={
        <Link style={{ color: '#1890ff' }} to={`/activity/${item.id}`}>
          {item.resource.name}
        </Link>
      }
      description={
        <div>
          {item.community &&
            item.community.resource &&
            item.community.resource.name}{' '}
          {item.resource.tags.map(tag => (
            <Button
              key={`tag_${tag}`}
              size="small"
              style={{ marginRight: '.5em' }}
            >
              #{tag}
            </Button>
          ))}
        </div>
      }
    />
    <div style={{ whiteSpace: 'pre-line' }}>{item.resource.description}</div>
  </List.Item>
)

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

  const [filtered, setFiltered] = useState(activity.list)
  /**
   * func filtered Activite
   * @param  {string} s value from input
   * @return {[type]}   [description]
   */
  const filterActivites = sInputValue => {
    if (sInputValue === '') {
      return setFiltered(activity.list)
    }
    const isActivityLike = filterActivity(sInputValue)
    const activites = activity.list.filter(isActivityLike)
    const filtered = activites.filter(v => v)
    setFiltered(filtered)
  }

  useEffect(() => {
    dispatch(GET_LIST)
    filterActivites(activity.filter)
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
      <div>
        <input
          defaultValue={activity.filter}
          onChange={({ target }) => {
            dispatch(ON_FILTER, target.value)
            filterActivites(target.value)
          }}
        />
      </div>
      <Divider />
      <Row>
        <Col span={18}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={
              activity.filter || filtered.length ? filtered : activity.list
            }
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

// libs
const filterActivity = payload => {
  const regexp = new RegExp(payload, 'gi')
  return ({ resource, community }) => {
    return !![resource.name, resource.desctiption, community.resource.name]
      .join(' ')
      .match(regexp)
  }
}
