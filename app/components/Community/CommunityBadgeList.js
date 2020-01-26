import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import './CommunityBadgeList.css'

const CommunityBadgeList = ({ list }) => {
  return (
    <Card>
      {list.map(community => {
        const isPrimary = community.primary
        return (
          <Button
            className="community-badge"
            key={community.name}
            style={{
              border: '1px solid #6F4297',
              backgroundColor: isPrimary ? '#6F4297' : 'white',
              color: isPrimary ? 'white' : '#6F4297'
            }}
          >
            {community.name}
          </Button>
        )
      })}
    </Card>
  )
}

export default CommunityBadgeList
