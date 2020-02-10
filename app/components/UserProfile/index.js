import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Spin, Divider } from 'antd'

import { GET_LIST } from 'store/activity'

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
  const ActivitiesHeader = ({ text }) => (
    <p className="UserProfile-Text">{text}</p>
  )

  return (
    <InnerPageContentContainer>
      <main className="UserProfile">
        <ProfileInfo {...user} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
        <CommunityBadgeList community={community} communities={communities} />
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
