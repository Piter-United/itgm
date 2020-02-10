import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'

import './style.css'

import { Row, Col, Spin, Icon } from 'antd'
import { Breadcrumbs, Tags, Button, Curl } from '../UI'
import { ActivityAuthor, CommunityAvatar, Participants } from './atoms'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

import { LIKE, UNLIKE, GET_BY_ID, GET_BY_ID_RELOAD_BY_LU } from 'store/activity'

import history from '../../history'

const Activity = ({
  match: {
    params: { id }
  }
}) => {
  const { dispatch, activityInfo, user } = useStoreon('activityInfo', 'user')
  useEffect(() => {
    dispatch(GET_BY_ID, id)
  }, [id, dispatch])
  if (!activityInfo.data || activityInfo.data.activity.id !== id) {
    return <Spin size="large" />
  }
  const dispatchEvent = (event, id) => {
    dispatch(event, { id, event: GET_BY_ID_RELOAD_BY_LU })
  }
  const toggleLike = activity => {
    if (!user) {
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
    <InnerPageContentContainer>
      <div className="Activity-Breadcrumbs">
        <Breadcrumbs path="/activity" viewPath="/Программа" />
      </div>
      <Row type="flex" justify="center" align="top">
        <Col lg={24} xl={16}>
          <section className="Activity-Content">
            <h1 className="Activity-Header">
              {activity.name}
              {user.id && user.id === activity.user.id && (
                <Icon
                  type="edit"
                  onClick={() => history.push(`/activity/${activity.id}/edit`)}
                  style={{ color: '#1890ff' }}
                />
              )}
            </h1>
            <div className="Activity-Tags">
              <Tags data={tags} />
            </div>
            <p className="Activity-Description">{activity.description}</p>
            <div className="Activity-AuthorBlock">
              <ActivityAuthor
                user={resource.user.name}
                avatar={resource.user.avatar}
                community={resource.community.name}
                createdAt={ts}
              />
            </div>
            <Button
              onClick={() => toggleLike(activity)}
              text={
                activity.likes.isLike
                  ? 'Передумал участвовать'
                  : 'Хочу участвовать!'
              }
            />
          </section>
        </Col>
        <Col className="Activity-AsideRight" xl={8} lg={24}>
          <section className="Activity-AsideRightContent">
            <div className="Activity-AsideRightItem">
              <h2 className="Activity-SecondaryHeader">Сообщество</h2>
              <CommunityAvatar name={resource.community.name} />
            </div>
            <div className="Activity-AsideRightItem">
              <h2 className="Activity-SecondaryHeader">Участники</h2>
              <Participants data={likes} />
            </div>
          </section>
        </Col>

        <Curl />
      </Row>
    </InnerPageContentContainer>
  )
}

export default Activity
