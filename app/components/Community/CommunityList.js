import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Avatar,
  List,
  Icon,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Card,
  Meta
} from 'antd'

import useStoreon from 'storeon/react'

import VkIcon from '../../asset/vk.svg'
import { GET_LIST } from '../../store/community'
import history from '../../history'

const { Title } = Typography

const style = {
  height: 300,
  margin: 16
}

const descStyle = {
  whiteSpace: 'pre-line',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
  // "line-clamp": 4,
}

const CommunityListItem = item => (
  <Card key={item.id} style={style}>
    <Row>
      <Col span={20}>
        <h3>
          <Link to={`/community/${item.id}`}>{item.name}</Link>
        </h3>
        <div style={descStyle}>{item.description}</div>
      </Col>
      <Col span={4}>
        <Avatar size={80} src={`https://www.gravatar.com/avatar/`} />
      </Col>
    </Row>
    <Link to={`/community/${item.id}`}> Подробнее </Link>
  </Card>
)

const mapper = (arr, iterator) => {
  try {
    return arr.map(iterator)
  } catch {
    ;<div>Список пуст!</div>
  }
}

const splitList = arr => {
  return [
    arr.map((v, i) => (i % 2 === 0 ? v : 0)).filter(v => v),
    arr.map((v, i) => (i % 2 !== 0 ? v : 0)).filter(v => v)
  ]
}

const CommunityList = () => {
  const { user, community, dispatch } = useStoreon('community', 'user')
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  const [left, right] = splitList(community.list)
  return (
    <div className="content">
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Title className="heading heading_level_1">Сообщества</Title>
        <div>TODO: filter sort, </div>
      </Row>

      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        {user && (
          <Button icon="plus-circle" href="/community/new">
            Добавить сообщество
          </Button>
        )}
      </Row>
      <Divider />
      <Row>
        <Col span={12}>{mapper(left, CommunityListItem)}</Col>
        <Col span={12}>{mapper(right, CommunityListItem)}</Col>
      </Row>
    </div>
  )
}

export default CommunityList

/*
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        loading={community.loading}
        dataSource={community.list}
        renderItem={CommunityListItem}
      />

          <div
      
      actions={item.social.map(social => (
        <a key={social.icon} href={social.link} target="_blank">
          {social.icon === 'vk' ? (
            <Icon style={{ fontSize: 24 }} component={VkIcon} />
          ) : (
            <Icon style={{ fontSize: 24 }} type={social.icon} />
          )}
        </a>
      ))}
    >

      
    </div>

*/
