import React from 'react'
import { Tag } from 'antd'
import './style.css'

const CommunityTags = ({ data = [] }) => {
  if (data.length === 0) return null
  return (
    <div className="Community-Tags">
      {data.map(tag => (
        <Tag key={`community-${tag}`} className="Community-Tag">
          {tag}
        </Tag>
      ))}
    </div>
  )
}

export default CommunityTags
