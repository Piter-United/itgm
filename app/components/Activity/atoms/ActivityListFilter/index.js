import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import cn from 'classnames'
import { Button, Form, Input, Icon, Row } from 'antd'

import { GET_LIST as GET_LIST_COMMUNITY } from 'store/community'
import { ON_FILTER, ON_TAG, ON_COMMUNITY } from 'store/activity'

const ActivityFilter = ({ handleClose }) => {
  const { community, activity, dispatch } = useStoreon('community', 'activity')

  useEffect(() => {
    dispatch(GET_LIST_COMMUNITY)
  }, [dispatch])

  const btnsCommunities = community.list.map(e => {
    const isSelectedCommunity = e.id === activity.community
    return (
      <Button
        className={cn({
          'ActivityFilter-Control': true,
          'ActivityFilter-Control_selected': isSelectedCommunity
        })}
        onClick={() => dispatch(ON_COMMUNITY, e.id)}
        key={e.id}
      >
        {e.name}
      </Button>
    )
  })

  const btnsTags = activity.list
    .map(e => e.resource.tags)
    .flat()
    .map((e, i) => {
      const isSelectedTag = activity.tags.indexOf(e) > -1
      return (
        <Button
          className={cn({
            'ActivityFilter-Control': true,
            'ActivityFilter-Control_selected': isSelectedTag
          })}
          onClick={() => dispatch(ON_TAG, e)}
          key={i + 'tag'}
        >
          {e}
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
              onChange={({ target }) => dispatch(ON_FILTER, target.value)}
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
