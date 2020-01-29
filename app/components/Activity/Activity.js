import React, { useEffect, Fragment } from 'react'
import useStoreon from 'storeon/react'

import './style.css'

import { Spin, Icon } from 'antd'
import { Breadcrumbs, Tags, Button, Curl } from '../UI'
import { ActivityAuthor, CommunityAvatar, Participants } from './atoms'

import { LIKE, UNLIKE, GET_BY_ID, GET_BY_ID_RELOAD_BY_LU } from 'store/activity'

import history from '../../history'

import { Footer } from '../Footer'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import Header from '../Header/Header'

const Activity = ({
  match: {
    params: { id }
  }
}) => {
  const { dispatch, activityInfo, userId } = useStoreon(
    'activityInfo',
    'userId'
  )
  useEffect(() => {
    dispatch(GET_BY_ID, id)
  }, [id, dispatch])
  if (!activityInfo.data || activityInfo.data.activity.id !== id) {
    return <Spin size="large" />
  }
  const dispatchEvent = (event, id) => {
    dispatch(event, { id, event: GET_BY_ID_RELOAD_BY_LU })
  }
  const toggleLike = (userId, activity) => {
    if (!userId) {
      return history.push('/login')
    }
    if (activity.likes.isLike) {
      return dispatchEvent(UNLIKE, activity.likes.id)
    }
    return dispatchEvent(LIKE, activity.id)
  }

  const { activity = {}, likes = [] } = activityInfo.data
  const { tags = [], resource = {}, ts = '' } = activity

  return (
    <Fragment>
      <Header />
      <InnerPageContentContainer>
        <main className="Activity">
          <div className="Activity-Breadcrumbs">
            <Breadcrumbs path="#" viewPath="/Программа" />
          </div>
          <div className="Activity-Wrapper">
            <section className="Activity-Content">
              <h1 className="Activity-Header">
                {activity.name}
                {userId && userId === activity.user.id && (
                  <Icon
                    type="edit"
                    onClick={() =>
                      history.push(`/activity/${activity.id}/edit`)
                    }
                    style={{ color: '#1890ff' }}
                  />
                )}
              </h1>
              <div className="Activity-Tags">
                <Tags data={tags} />
              </div>
              <p className="Activity-Description">{activity.description}</p>
              <ActivityAuthor
                user={resource.user.name}
                community={resource.community.name}
                createdAt={ts}
              />
            </section>
            <section className="Activity-Meta">
              <div className="Activity-Community">
                <h2 className="Activity-SecondaryHeader">Сообщество</h2>
                <CommunityAvatar name={resource.community.name} />
              </div>
              <div className="Activity-Participants">
                <h2 className="Activity-SecondaryHeader">Участники</h2>
                <Participants data={likes} />
              </div>
            </section>
          </div>
          <Button
            onClick={() => toggleLike(userId, activity)}
            text={
              activity.likes.isLike
                ? 'Передумал участвовать'
                : 'Хочу участвовать!'
            }
          />
          <Curl />
        </main>
      </InnerPageContentContainer>
      <Footer />
    </Fragment>
  )
}

export default Activity
