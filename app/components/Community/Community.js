import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'

import { Spin, Row, Col, Icon, Divider, List } from 'antd'

import { GET_BY_ID, GET_BY_ID_RELOAD_BY_LU } from 'store/community'

import VkIcon from '../../asset/vk.svg'

import { ShowItem } from '../Activity/ActivityList'

const Community = ({
  match: {
    params: { id }
  }
}) => {
  const { dispatch, communityInfo, userId } = useStoreon(
    'communityInfo',
    'userId'
  )
  useEffect(() => {
    dispatch(GET_BY_ID, id)
  }, [id, dispatch])
  if (!communityInfo.data || communityInfo.data.community.id !== id) {
    return <Spin size="large" />
  }
  const dispatchEvent = (event, id) => {
    dispatch(event, { id, event: GET_BY_ID_RELOAD_BY_LU })
  }
  const { community, manager, activity } = communityInfo.data
  return (
    <div>
      <Row>
        <Col span={16}>
          <h2>{community.name}</h2>
          <div style={{ marginBottom: '1em' }}>
            {community.social.map(social => (
              <a
                style={{ marginRight: 10 }}
                key={social.icon}
                href={social.link}
                target="_blank"
              >
                {social.icon === 'vk' ? (
                  <Icon style={{ fontSize: 24 }} component={VkIcon} />
                ) : (
                  <Icon style={{ fontSize: 24 }} type={social.icon} />
                )}
              </a>
            ))}
          </div>
          <div style={{ whiteSpace: 'pre-line' }}>{community.description}</div>
          <Divider />
          <h3>Темы</h3>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={communityInfo.loading}
            dataSource={activity}
            renderItem={item => (
              <ShowItem
                key={item.id}
                userId={userId}
                item={item}
                dispatch={dispatchEvent}
              />
            )}
          />
        </Col>
        <Col span={8}>
          <h3>Администраторы</h3>
          <div>{community.owner.name}</div>
          {manager.map(item => (
            <div key={item.id}>{item.user.name}</div>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Community
