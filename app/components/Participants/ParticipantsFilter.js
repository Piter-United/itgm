import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { Button, Form, Input, Icon, Row } from 'antd'

import { GET_LIST as GET_LIST_COMMUNITY } from 'store/community'
import { ON_FILTER, ON_COMMUNITY } from 'store/participant'

const ParticipantsFilter = ({ handleClose }) => {
  const { community, participant, dispatch } = useStoreon(
    'community',
    'participant'
  )

  useEffect(() => {
    dispatch(GET_LIST_COMMUNITY)
  }, [dispatch])

  const btnsCommunities = community.list.map(e => {
    return (
      <Button
        type={e.id === participant.community ? 'primary' : ''}
        onClick={() => dispatch(ON_COMMUNITY, e.id)}
        key={e.id}
      >
        {e.name}
      </Button>
    )
  })

  return (
    <div className="participantsFilter-Content">
      <Row type="flex" justify="end">
        <Icon
          className="participantsPage-BtnCloseFilter"
          type="close"
          style={{ fontSize: '20px' }}
          onClick={handleClose}
        />
      </Row>
      <span>Поиск по темам</span>
      <Form className="login-form">
        <Form.Item>
          <Input
            defaultValue={participant.filter}
            onChange={({ target }) => dispatch(ON_FILTER, target.value)}
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
      </Form>
      <span>Сообщества</span>
      <div>{btnsCommunities}</div>
    </div>
  )
}

export default ParticipantsFilter
