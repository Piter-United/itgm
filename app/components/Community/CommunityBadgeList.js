import React from 'react'
import { Button, Card, Tooltip } from 'antd'
import './CommunityBadgeList.css'

const CommunityBadgeList = ({ communities, community }) => {
  const allCommunities = [
    { ...community, primary: true },
    ...(communities || [])
  ]
  return (
    <Card bordered={false} className="Community-Badge-List">
      {allCommunities.map(community => {
        const isPrimary = community.primary
        return (
          <Tooltip placement="top" key={community.name} title={community.name}>
            <Button
              href={`./community/${community.id}`}
              className="Community-Badge-List__badge"
              style={{
                border: '1px solid #6F4297',
                backgroundColor: isPrimary ? '#6F4297' : 'white',
                color: isPrimary ? 'white' : '#6F4297'
              }}
            >
              {community.name}
            </Button>
          </Tooltip>
        )
      })}
    </Card>
  )
}

export default CommunityBadgeList
