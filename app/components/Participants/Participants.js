import React, { useEffect } from 'react'

import { List, Icon, Button, Typography, Row, Col, Divider } from 'antd'

const { Title } = Typography

import Avatar from '../UI/Avatar'

const Participants = () => (
  <div>
    <Row>
      <Col span={18}>
        <Title className="heading heading_level_1">Участники конференции</Title>
      </Col>
    </Row>
    <Row>
      <Avatar type={'partner'} />
    </Row>
  </div>
)

export default Participants
