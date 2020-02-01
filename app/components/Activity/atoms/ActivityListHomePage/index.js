import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'

import { List, Row, Col, Typography, Divider } from 'antd'
import { GET_LIST } from 'store/activity'
import ShowItem from '../ActivityListItem'

import '../../../Heading/Heading.css'
import '../../style.css'

const { Title } = Typography

export default () => {
  const { userId, activity, dispatch } = useStoreon('userId', 'activity')

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
