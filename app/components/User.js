import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { Card, Avatar, Spin, Divider, Typography, Button } from 'antd'

const { Paragraph } = Typography

import { GET_CURRENT_USER } from '../store/user'
import history from '../history'

import './Form/_view/Form_view_profile.css'
import './List/_type/List_type_unstyled.css'
import './List/_view/List_view_communities.css'

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
        <div className="form__header">
          <div className="form__user">
            {user.name}
            <Button
              type="link"
              key="edit"
              icon="edit"
              onClick={() => history.push('/user/edit')}
            />
          </div>
          <div className="form__avatar">
            {user && user.photo ? (
              <Avatar size={80} src={user.photo} />
            ) : user.avatar_hash ? (
              <Avatar
                size={80}
                src={`https://www.gravatar.com/avatar/${user.avatar_hash}`}
              />
            ) : (
              <Avatar size={80} icon="user" />
            )}
          </div>
        </div>
        {user.specialization} в {user.company}
        <br />
        <br />
        {[user.email, user.phone].join(' | ')}
        <br />
        <br />
        {user.about}
        <br />
        <Divider />
        <ul className="list list_type_unstyled list_view_communities">
          <li className="list__item">
            <Button type="primary" href={`/community/${user.community.id}`}>
              {user.community.name}
            </Button>
          </li>
          {(user.communities || []).map(community => (
            <li className="list__item" key={community.id}>
              <Button href={`/community/${community.id}`}>
                {community.name}
              </Button>
            </li>
          ))}
        </ul>
        <Divider />
        {/* Участвует в следующих обсуждениях: */}
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

export default User
