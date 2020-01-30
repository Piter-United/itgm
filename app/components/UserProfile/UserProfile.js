import React, { useEffect, useState, Fragment } from 'react'
import useStoreon from 'storeon/react'
import { Spin, Typography, Divider, List } from 'antd'

import { GET_CURRENT_USER } from 'store/user'
import { GET_LIST, LIKE, UNLIKE } from 'store/activity'

import history from '../../history'

import UserInfo from './UserInfo'
import CommunityBadgeList from 'components/Community/CommunityBadgeList'
import { ShowItem } from 'components/Activity/ActivityList'

import './UserProfile.css'

const { Paragraph } = Typography

const UserProfile = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )
  //TODO: check why front send too many requests.
  useEffect(() => {
    dispatch(GET_CURRENT_USER)
  }, [dispatch])

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  if (!user) {
    return <Spin size="large" />
  }
  const {
    email,
    community,
    phone,
    name,
    company,
    about,
    id,
    communities,
    specialization,
    avatar_hash
  } = user

  //TODO: format with regexp for phones;
  // const formattedPhone = num => { }
  const userActivities = activity.list.filter(
    event => event.resource.user.id === userId
  )
  const communityList = { community, communities }
  const ActivitiesHeader =
    userActivities.length > 0 ? (
      <p className="User-Profile__text">Участвует в следующих обсуждениях:</p>
    ) : (
      <p className="User-Profile__text">Пока еще не выбрал тему обсуждения</p>
    )

  const renderUserActivities = () =>
    userActivities.length > 0 ? (
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        loading={activity.loading}
        dataSource={userActivities}
        renderItem={item => (
          <ShowItem
            key={item.id}
            userId={userId}
            item={item}
            dispatch={dispatch}
          />
        )}
      />
    ) : (
      false
    )

  return (
    <main className="User-Profile__wrapper">
      <section className="User-Profile">
        <UserInfo {...user} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
        <CommunityBadgeList {...communityList} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
        {ActivitiesHeader}
        {renderUserActivities()}
      </section>
    </main>
  )
}

export default UserProfile
