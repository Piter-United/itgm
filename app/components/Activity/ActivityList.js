import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Layout, List, Icon, Row, Col, Button, Typography, Divider } from 'antd'
import useStoreon from 'storeon/react'
import moment from 'moment'
import cn from 'classnames'

import '../Heading/Heading.css'
import './ActivityList.css'

import { GET_LIST, LIKE, UNLIKE } from 'store/activity'

import history from '../../history'

const { Title } = Typography
const { Header, Footer, Sider, Content } = Layout

const onHandlerClick = (userId, item, dispatch) => {
  if (!userId) {
    return history.push('/login')
  }
  if (item.likes.isLike) {
    return dispatch(UNLIKE, item.likes.id)
  }
  return dispatch(LIKE, item.id)
}

export const ShowItem = ({ dispatch, item, userId }) => (
  <List.Item className="ActivityListItem" key={item.id}>
    <div>
      <div className="ActivityListItem-Misc">
        <span>{moment(item.ts).format('DD.MM.YYYY')}</span>
        <div>
          {item.community &&
            item.community.resource &&
            item.community.resource.name}{' '}
        </div>
      </div>
      <Link className="ActivityListItem-TitleLink" to={`/activity/${item.id}`}>
        {item.resource.name}
      </Link>
    </div>
    <div className="ActivityListItem-Description">
      {item.resource.description}
    </div>
    <div className="ActivityListItem-Footer">
      <div className="ActivityListItem-Likes" key={`list-item-like-${item.id}`}>
        <Icon
          onClick={() => onHandlerClick(userId, item, dispatch)}
          type="heart"
          theme={item.likes.isLike ? 'filled' : ''}
          className={cn({
            'ActivityListItem-LikeIcon': true,
            'ActivityListItem-LikeIcon_islike_true': item.likes.isLike
          })}
        />{' '}
        <span className="ActivityListItem-LikeCounter">{`(${item.likes.count})`}</span>
      </div>
      <span className="ActivityListItem-Author">
        Автор: {item.resource.user.id}
      </span>
    </div>
  </List.Item>
)

const RenderDiscussion = ({ userId, user }) => {
  if (userId) {
    if (user) {
      return (
        <Button icon="plus-circle" href="/activity/new">
          Добавить обсуждение
        </Button>
      )
    }
    return (
      <Button icon="plus-circle" href="/user/edit">
        Добавить обсуждение
      </Button>
    )
  }
  return (
    <Button icon="plus-circle" href="/login">
      Добавить обсуждение
    </Button>
  )
}

const renderLandingActivity = (list, { activity, userId, dispatch }) => {
  const firstThreeActivities = list.slice(0, 3)
  return (
    <div className="content">
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Col span={18}>
          <Title className="heading heading_level_1">
            Программа обсуждения
          </Title>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={18}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={firstThreeActivities}
            renderItem={item => (
              <ShowItem
                key={item.id}
                userId={userId}
                item={item}
                dispatch={dispatch}
              />
            )}
          />
        </Col>
        <Col span={6} />
      </Row>
    </div>
  )
}

const renderActivity = (list, { activity, userId, dispatch }) => {
  return (
    <Layout>
      <Content>
        <div className="content">
          <Row style={{ display: 'flex', alignItems: 'baseline' }}>
            <Col span={18}>
              <Title className="heading heading_level_1">
                Программа обсуждения
              </Title>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={18}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={false}
                loading={activity.loading}
                dataSource={list}
                renderItem={item => (
                  <ShowItem
                    key={item.id}
                    userId={userId}
                    item={item}
                    dispatch={dispatch}
                  />
                )}
              />
            </Col>
            <Col span={6} />
          </Row>
        </div>
      </Content>
    </Layout>
  )
}

const ActivityList = ({ placement }) => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  const activitiesByNewest = [...activity.list].sort((a, b) => {
    if (new Date(a.ts) > new Date(b.ts)) {
      return -1
    } else if (new Date(a.ts) < new Date(b.ts)) {
      return 1
    }
    return 0
  })

  switch (placement) {
    case 'HomePage':
      return renderLandingActivity(activitiesByNewest, {
        activity,
        userId,
        dispatch
      })
    default:
      return renderActivity(activitiesByNewest, { activity, userId, dispatch })
  }
}

export default ActivityList
