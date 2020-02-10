import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import cn from 'classnames'
import { Button, Form, Input, Icon, Row } from 'antd'

import { GET_LIST as GET_LIST_COMMUNITY } from 'store/community'
import {
  SET_FILTER_TEXT,
  SET_FILTER_TAG,
  SET_FILTER_COMMUNITY
} from 'store/activity'

const ActivityFilter = ({ handleClose }) => {
  const { community, activity, activityFilter, dispatch } = useStoreon(
    'community',
    'activity',
    'activityFilter'
  )

  useEffect(() => {
    dispatch(GET_LIST_COMMUNITY)
  }, [dispatch])

  const btnsCommunities = community.list.map(({ id, name }) => {
    const isSelectedCommunity = id === activityFilter.communityId
    return (
      <Button
        className={cn({
          'ActivityFilter-Control': true,
          'ActivityFilter-Control_selected': isSelectedCommunity
        })}
        onClick={() => dispatch(SET_FILTER_COMMUNITY, id)}
        key={id}
      >
        {name}
      </Button>
    )
  })

  const btnsTags = activity.list
    .map(({ resource: { tags } }) => tags)
    .flat()
    .map((tag, i) => {
      const isSelectedTag = activityFilter.tags.includes(tag)
      return (
        <Button
          className={cn({
            'ActivityFilter-Control': true,
            'ActivityFilter-Control_selected': isSelectedTag
          })}
          onClick={() => dispatch(SET_FILTER_TAG, tag)}
          key={i + 'tag'}
        >
          {tag}
        </Button>
      )
    })

  return (
    <div className="ActivityFilter-Content">
      <Row type="flex" justify="end">
        <Icon
          className="ActivityFilter-BtnCloseFilter"
          type="close"
          style={{ fontSize: '20px' }}
          onClick={handleClose}
        />
      </Row>
      <div className="ActivityFilter-FilterControlBlock">
        <span className="ActivityFilter-FilterControlLabel">
          Поиск по темам
        </span>
        <Form className="login-form">
          <Form.Item>
            <Input
              defaultValue={activity.filter}
              onChange={({ target }) => dispatch(SET_FILTER_TEXT, target.value)}
              prefix={
                <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
            />
          </Form.Item>
        </Form>
      </div>
      <div className="ActivityFilter-FilterControlBlock">
        <span className="ActivityFilter-FilterControlLabel">Сообщества</span>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {btnsCommunities}
        </div>
      </div>
      <div className="ActivityFilter-FilterControlBlock">
        <span className="ActivityFilter-FilterControlLabel">Метки</span>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{btnsTags}</div>
      </div>
    </div>
  )
}

export default ActivityFilter
