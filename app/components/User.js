import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { Card, Avatar, Spin, Divider, Typography, Button } from 'antd'

const { Paragraph } = Typography

import { GET_CURRENT_USER } from '../store/user'
import history from '../history'

const UserLineShow = ({ title }) => (
  <span>
    <Paragraph>{title}</Paragraph>
    <Divider />
  </span>
)

const User = () => {
  const { user, dispatch } = useStoreon('user')
  useEffect(() => {
    dispatch(GET_CURRENT_USER)
  }, [dispatch])
  if (!user) {
    return <Spin size="large" />
  }
  return (
    <div className="content">
      <Card
        style={{
          position: 'relative',
          width: 450,
          margin: '20px auto',
          textAlign: 'center'
        }}
      >
        <Button
          style={{
            position: 'absolute',
            right: 10,
            top: 10
          }}
          key="edit"
          icon="edit"
          onClick={() => history.push('/user/edit')}
        />
        {user.photo ? (
          <Avatar size={150} src={user.photo} />
        ) : (
          <Avatar size={150} icon="user" />
        )}
        <Divider />
        <UserLineShow title={user.name.formatted} />
        <UserLineShow title={user.email} />
        {user.data.community && (
          <UserLineShow title={user.data.community.name} />
        )}
        {user.data.company && <UserLineShow title={user.data.company} />}
        {user.data.specialization && (
          <UserLineShow title={user.data.specialization} />
        )}
        {user.data.about && <UserLineShow title={user.data.about} />}
      </Card>
      <pre>{JSON.stringify(user, '', 2)}</pre>
    </div>
  )
}

export default User
