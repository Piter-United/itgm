import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Icon, Row, Col, Button, Typography, Divider } from 'antd'
import useStoreon from 'storeon/react'
import moment from 'moment'
import cn from 'classnames'

import '../Heading/Heading.css'
import './ActivityList.css'

import { GET_LIST, LIKE, UNLIKE, ON_FILTER } from '../../store/activity'

import history from '../../history'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const { Title } = Typography

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

const ActivityList = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )

  const [filtered, setFiltered] = useState(activity.list)
  /**
   * func filtered Activite
   * @param  {string} s value from input
   * @return {[type]}   [description]
   */
  const filterActivites = sInputValue => {
    if (sInputValue === '') {
      return setFiltered(activity.list)
    }
    const isActivityLike = filterActivity(sInputValue)
    const activites = activity.list.filter(isActivityLike)
    const filtered = activites.filter(v => v)
    setFiltered(filtered)
  }

  useEffect(() => {
    dispatch(GET_LIST)
    filterActivites(activity.filter)
  }, [dispatch])

  return (
    <div className="content">
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Col span={18}>
          <Title className="heading heading_level_1">Обсуждения</Title>
        </Col>
        <Col span={6}>
          <RenderDiscussion userId={userId} user={user} />
        </Col>
      </Row>
      <div>
        <input
          defaultValue={activity.filter}
          onChange={({ target }) => {
            dispatch(ON_FILTER, target.value)
            filterActivites(target.value)
          }}
        />
      </div>
      <Divider />
      <Row>
        <Col span={18}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={
              activity.filter || filtered.length ? filtered : activity.list
            }
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

export const WrappedActivityList = () => (
  <InnerPageContentContainer>
    <ActivityList />
  </InnerPageContentContainer>
)

export default ActivityList

// libs
const filterActivity = payload => {
  const regexp = new RegExp(payload, 'gi')
  return ({ resource, community }) => {
    return !![resource.name, resource.desctiption, community.resource.name]
      .join(' ')
      .match(regexp)
  }
}
