import React from 'react'
import { Spin, Typography, Divider, List } from 'antd'
import { ShowItem } from 'components/Activity/ActivityList'
import UserProfile from '../..'

const UserActivities = ({ activities, activity, userId, dispatch }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={false}
    loading={activity.loading}
    dataSource={activities}
    renderItem={item => (
      <ShowItem key={item.id} userId={userId} item={item} dispatch={dispatch} />
    )}
  />
)

export default UserActivities
