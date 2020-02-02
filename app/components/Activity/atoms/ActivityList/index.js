import React from 'react'
import cn from 'classnames'
import { List } from 'antd'
import ActivityListItem from '../ActivityListItem'

const ActivityList = ({ className = '', activitiesData, dispatch, userId }) => (
  <List
    className={cn(className)}
    itemLayout="vertical"
    size="large"
    pagination={false}
    loading={activitiesData.loading}
    dataSource={activitiesData.list}
    renderItem={item => (
      <ActivityListItem
        key={item.id}
        userId={userId}
        item={item}
        dispatch={dispatch}
      />
    )}
  />
)

export default ActivityList
