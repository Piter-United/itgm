import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Button, notification } from 'antd'
import useStoreon from 'storeon/react'

import { GET_LIST, LIKE, UNLIKE } from '../../store/activity'

export const ShowItem = ({ dispatch, item }) => (
  <List.Item
    key={item.id}
    actions={[
      <span
        onClick={() =>
          item.likes.isLike
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
      title={<Link to={`/activity/${item.id}`}>{item.resource.name}</Link>}
      description={
        <div>
          {item.community &&
            item.community.resource &&
            item.community.resource.name}{' '}
          ({item.resource.tags.join(',')})
        </div>
      }
    />
    <div style={{ whiteSpace: 'pre-line' }}>{item.resource.description}</div>
  </List.Item>
)

const Home = () => {
  const { user, activity, dispatch } = useStoreon('user', 'activity')

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <div className="content">
      <Row>
        <Col span={18}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={activity.list}
            renderItem={item => <ShowItem item={item} dispatch={dispatch} />}
          />
        </Col>
        <Col span={6}>
          {user && (
            <Button icon="plus-circle" href="/activity/new">
              Добавить
            </Button>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Home
