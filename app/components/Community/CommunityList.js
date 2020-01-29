import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { List, Icon, Button, Typography, Row, Col, Divider } from 'antd'

import useStoreon from 'storeon/react'

import VkIcon from '/asset/icons/vk.svg'
import { GET_LIST } from 'store/community'
import history from '../../history'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const { Title } = Typography

const CommunityList = () => {
  const { user, community, dispatch } = useStoreon('community', 'user')
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])
  return (
    <InnerPageContentContainer>
      <div className="content">
        <Row style={{ display: 'flex', alignItems: 'baseline' }}>
          <Col span={18}>
            <Title className="heading heading_level_1">Сообщества</Title>
          </Col>
          <Col span={6}>
            {user && (
              <Button icon="plus-circle" href="/community/new">
                Добавить сообщество
              </Button>
            )}
          </Col>
        </Row>
        <Divider />
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          loading={community.loading}
          dataSource={community.list}
          renderItem={item => (
            <List.Item
              key={item.id}
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
              <h3>
                <Link to={`/community/${item.id}`}>{item.name}</Link>
              </h3>
              <div style={{ whiteSpace: 'pre-line' }}>{item.description}</div>
            </List.Item>
          )}
        />
      </div>
    </InnerPageContentContainer>
  )
}

export default CommunityList
