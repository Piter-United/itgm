import React, { useEffect } from 'react'

import { List, Icon } from 'antd'

import useStoreon from 'storeon/react'

import VkIcon from '../../asset/vk.svg'
import { GET_LIST } from '../store/community'

const Community = () => {
  const { community, dispatch } = useStoreon('community')
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])
  return (
    <div className="content">
      <h2>Сообщества</h2>
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
            <h3>{item.name}</h3>
            <div style={{ whiteSpace: 'pre-line' }}>{item.description}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Community
