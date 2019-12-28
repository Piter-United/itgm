import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { Card, Avatar, Spin, Divider, Typography, Button } from 'antd'

const { Paragraph } = Typography

import { GET_CURRENT_USER } from '../store/user'
import history from '../history'

import './Form/_view/Form_view_profile.css'

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
      <div className="form form_view_profile">
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
        <div className="form__header">
          <div className="form__user">{user.name}</div>
          <div className="form__avatar">
            {user && user.photo ? (
              <Avatar size={80} src={user.photo} />
            ) : (
              <Avatar size={80} icon="user" />
            )}
          </div>
        </div>

        <br />
        {user.email}
        <br />
        {user.phone}
        <br />
        {user.community.name}
        <br />
        {(user.communities || []).map(community => community.id).join(', ')}
        <br />
        {user.company}
        <br />
        {user.specialization}
        <br />
        {user.about}
        <br />
      </div>
      <Card
        style={{
          position: 'relative',
          width: 450,
          margin: '20px auto',
          textAlign: 'center'
        }}
      ></Card>
    </div>
  )
}

export default User
