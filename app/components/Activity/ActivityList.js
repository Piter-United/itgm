import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Form,
  Input,
  List,
  Icon,
  Row,
  Col,
  Typography,
  Divider
} from 'antd'
import useStoreon from 'storeon/react'
import moment from 'moment'
import cn from 'classnames'

import { Button as ButtonCustom } from '../UI'
import '../Heading/Heading.css'
import './ActivityList.css'

import { GET_LIST, LIKE, UNLIKE, ON_FILTER, ON_TAG } from 'store/activity'
import { GET_LIST as GET_LIST_COMMUNITY } from 'store/community'

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
        <ButtonCustom type="link" text="Добавить Тему" href="/activity/new" />
      )
    }
    return <ButtonCustom type="link" text="Добавить Тему" href="/user/edit" />
  }
  return <ButtonCustom type="link" text="Добавить Тему" href="/login" />
}
const ButtonShowFilter = ({ handleOpenFilter }) => (
  <button className="ActivityPage-BtnFilter" onClick={handleOpenFilter}>
    <Icon type="search" style={{ fontSize: '20px' }} />
    <Icon type="filter" style={{ fontSize: '20px', marginLeft: '10px' }} />
  </button>
)

const ActivityListSection = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <div className="content">
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        <Col span={24}>
          <Title className="heading heading_level_1">
            Программа обсуждений
          </Title>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={false}
            loading={activity.loading}
            dataSource={activity.list.slice(0, 3)}
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
      </Row>
    </div>
  )
}

const ActivityFilter = ({ handleClose }) => {
  const { community, activity, dispatch } = useStoreon('community', 'activity')

  useEffect(() => {
    dispatch(GET_LIST_COMMUNITY)
  }, [dispatch])

  const btnsCommunities = community.list.map(e => (
    <Button key={e.id}>{e.name}</Button>
  ))

  const btnsTags = activity.list
    .map(e => e.resource.tags)
    .flat()
    .map((e, i) => (
      <Button onClick={() => dispatch(ON_TAG, e)} key={i + 'tag'}>
        {e}
      </Button>
    ))

  return (
    <div className="ActivityFilter-Content">
      <Row type="flex" justify="end">
        <Icon
          className="ActivityPage-BtnCloseFilter"
          type="close"
          style={{ fontSize: '20px' }}
          onClick={handleClose}
        />
      </Row>
      <span>Поиск по темам</span>
      <Form className="login-form">
        <Form.Item>
          <Input
            onChange={({ target }) => dispatch(ON_FILTER, target.value)}
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
      </Form>
      <span>Сообщества</span>
      <div>{btnsCommunities}</div>
      <span>Метки</span>
      <div>{btnsTags}</div>
    </div>
  )
}

const ActivityListPage = () => {
  const { userId, user, activity, dispatch } = useStoreon(
    'user',
    'userId',
    'activity'
  )
  const countActivityRecords = activity.list.length

  const [showFilter, toggleFilter] = useState(false)
  const handleToggleFilter = () => toggleFilter(!showFilter)

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <div className="content">
      <Row type="flex" justify="center">
        <Col
          lg={24}
          xl={showFilter ? 16 : 18}
          className="ActivityPage-WrapperContent"
        >
          <div
            className={cn({
              'ActivityPage-Content': true,
              'ActivityPage-Content_filter_show': showFilter
            })}
          >
            <Title className="heading heading_level_1">
              Программа обсуждений
              <span style={{ color: '#ABABAB', fontWeight: '300' }}>
                {' '}
                ({countActivityRecords})
              </span>
            </Title>
            <Row type="flex" justify="space-between">
              <RenderDiscussion userId={userId} user={user} />
              {!showFilter ? (
                <ButtonShowFilter handleOpenFilter={handleToggleFilter} />
              ) : null}
            </Row>
            <Divider />
            <List
              itemLayout="vertical"
              size="large"
              pagination={false}
              loading={activity.loading}
              dataSource={activity.list}
              renderItem={item => (
                <ShowItem
                  key={item.id}
                  userId={userId}
                  item={item}
                  dispatch={dispatch}
                />
              )}
            />
          </div>
        </Col>
        <Col
          className={cn({
            ActivityFilter: true,
            ActivityFilter_visible: !showFilter
          })}
          lg={24}
          xl={8}
        >
          <ActivityFilter handleClose={handleToggleFilter} />
        </Col>
      </Row>
    </div>
  )
}

export const WrappedActivityList = () => (
  <InnerPageContentContainer>
    <ActivityListPage />
  </InnerPageContentContainer>
)

export default ActivityListSection
