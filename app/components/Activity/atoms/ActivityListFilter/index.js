import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import cn from 'classnames'
import { Button, Form, Input, Icon, Row, Select } from 'antd'

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

  const btnsCommunities = community.list
    .filter(({ id }) => id === activityFilter.communityId)
    .map(({ id, name }) => {
      return (
        <Button
          className={cn({
            'ActivityFilter-Control': true
          })}
          onClick={() => dispatch(SET_FILTER_COMMUNITY, id)}
          key={id}
        >
          {name}
        </Button>
      )
    })

  const btnsTags = activity.tags.map((tag, i) => {
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
        {/*<Icon*/}
        {/*  className="ActivityFilter-BtnCloseFilter"*/}
        {/*  type="close"*/}
        {/*  style={{ fontSize: '20px' }}*/}
        {/*  onClick={handleClose}*/}
        {/*/>*/}
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
        <span className="ActivityFilter-FilterControlLabel">
          Фильтр по сообществам
        </span>
        <Select
          style={{ width: '100%' }}
          showSearch
          value={activityFilter.communityId}
          onChange={id => dispatch(SET_FILTER_COMMUNITY, id)}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children[0]
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
          placeholder="Выберите сообщество из списка"
          optionLabelProp="label"
        >
          <Select.Option value="" label="Все">
            Все
          </Select.Option>
          {!community.loading &&
            community.list.map(item => (
              <Select.Option value={item.id} key={item.id} label={item.name}>
                {item.name}
                <span style={{ color: '#9e9e9e' }}> — {item.description}</span>
              </Select.Option>
            ))}
        </Select>
      </div>
      <div className="ActivityFilter-FilterControlBlock">
        <span className="ActivityFilter-FilterControlLabel">Метки</span>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{btnsTags}</div>
      </div>
    </div>
  )
}

export default ActivityFilter
