import React, { useEffect, useState, Fragment } from 'react'
import useStoreon from 'storeon/react'
import { Spin, Divider } from 'antd'

import { GET_CURRENT_USER } from 'store/user'
import { GET_LIST } from 'store/activity'

import history from '../../history'

import { InnerPageContentContainer } from 'components/InnerPageContentContainer'
import ProfileInfo from './atoms'
import ActivityList from 'components/Activity/atoms/ActivityList'
import CommunityBadgeList from 'components/Community/CommunityBadgeList'

import './style.css'

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
  const { community, communities } = user

  const userActivities = activity.list.filter(
    event => event.resource.user.id === userId
  )
  const userActivitiesTitle =
    userActivities.length > 0
      ? 'Участвует в следующих обсуждениях:'
      : 'Пока еще не выбрал тему обсуждения'
  const communityList = { community, communities }
  const ActivitiesHeader = ({ text }) => (
    <p className="UserProfile-Text">{text}</p>
  )

  return (
    <InnerPageContentContainer>
      <main className="UserProfile">
        <ProfileInfo {...user} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
        <CommunityBadgeList {...communityList} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
        <ActivitiesHeader text={userActivitiesTitle} />
        {userActivities.length > 0 && (
          <ActivityList
            activitiesData={{ ...activity, list: userActivities }}
            userId
            dispatch
          />
        )}
      </main>
    </InnerPageContentContainer>
  )
}

export default UserProfile
