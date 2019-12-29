import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'

import { Spin, Row, Col, Icon, Divider, List } from 'antd'

import { LIKE, UNLIKE } from '../../store/activity'
import { GET_BY_ID, GET_BY_ID_RELOAD_BY_LU } from '../../store/activity'
import history from '../../history'

const Activity = ({
  match: {
    params: { id }
  }
}) => {
  const { dispatch, activityInfo, userId } = useStoreon(
    'activityInfo',
    'userId'
  )
  useEffect(() => {
    dispatch(GET_BY_ID, id)
  }, [id, dispatch])
  if (!activityInfo.data || activityInfo.data.activity.id !== id) {
    return <Spin size="large" />
  }
  const dispatchEvent = (event, id) => {
    dispatch(event, { id, event: GET_BY_ID_RELOAD_BY_LU })
  }
  const { activity, likes } = activityInfo.data
  return (
    <div>
      <Row>
        <Col span={16}>
          <h2>
            {activity.name}{' '}
            {userId && userId === activity.user.id && (
              <Icon
                type="edit"
                onClick={() => history.push(`/activity/${activity.id}/edit`)}
                style={{ color: '#1890ff' }}
              />
            )}
          </h2>
          <div style={{ whiteSpace: 'pre-line' }}>{activity.description}</div>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() =>
              activity.likes.isLike
                ? dispatchEvent(UNLIKE, activity.likes.id)
                : dispatchEvent(LIKE, activity.id)
            }
          >
            <Icon
              type="like-o"
              style={{ color: activity.likes.isLike ? '#1890ff' : '' }}
            />{' '}
            {activity.likes.count}
          </span>
        </Col>
        <Col span={8}>
          <h3>Участники</h3>
          {likes.map(item => (
            <div key={item.id}>{item.user.name}</div>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Activity
