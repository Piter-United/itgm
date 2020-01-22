import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Button, Typography, Divider } from 'antd'
import useStoreon from 'storeon/react'

const { Title } = Typography

import '../Heading/Heading.css'

import { GET_LIST, LIKE, UNLIKE, ON_FILTER } from '../../store/activity'

import history from '../../history'

export const ShowItem = ({ dispatch, item, userId }) => (
  <List.Item
    key={item.id}
    actions={[
      <span
        onClick={() =>
          !userId
            ? history.push('/login')
            : item.likes.isLike
            ? dispatch(UNLIKE, item.likes.id)
            : dispatch(LIKE, item.id)
        }
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
          {item.resource.tags.map((tag, i) => (
            <Button key={i} size="small" style={{ marginRight: '.5em' }}>
              #{tag}
            </Button>
          ))}
        </div>
      }
    />
    <div style={{ whiteSpace: 'pre-line' }}>{item.resource.description}</div>
  </List.Item>
)

const ActivityList = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )

  const [filtered, setFiltered] = useState(activity.list)
  const filterActivites = s => {
    if (s === '') return setFiltered(activity.list)
    const f = filterActivity(s)
    setFiltered(activity.list.map(v => (f(v) ? v : false)).filter(v => v))
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
          {userId ? (
            user ? (
              <Button icon="plus-circle" href="/activity/new">
                Добавить обсуждение
              </Button>
            ) : (
              <Button icon="plus-circle" href="/user/edit">
                Добавить обсуждение
              </Button>
            )
          ) : (
            <Button icon="plus-circle" href="/login">
              Добавить обсуждение
            </Button>
          )}
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
            dataSource={filtered.length ? filtered : activity.list}
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
        <Col span={6}></Col>
      </Row>
    </div>
  )
}

export default ActivityList

// libs
const filterActivity = payload => {
  const regexp = new RegExp(payload, 'gi')
  return v => {
    const { resource, community } = v
    return !![resource.name, resource.desctiption, community.resource.name]
      .join(' ')
      .match(regexp)
  }
}
