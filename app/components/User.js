import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { Card, Avatar, Spin, Divider, Typography, Button } from 'antd'

const { Paragraph } = Typography

import { parse } from 'qs'

import history from '../history'

import { site_url, client_id } from '../config'
import { GET_CURRENT_USER } from '../store/user'

const UserLineShow = ({ title }) => (
  <span>
    <Paragraph>{title}</Paragraph>
    <Divider />
  </span>
)

export const User = () => {
  const { user, dispatch } = useStoreon('user')
  useEffect(() => {
    dispatch(GET_CURRENT_USER)
  }, [dispatch])
  if (!user) {
    return <Spin size="large" />
  }
  return (
    <div className="content">
      <Card style={{ width: 450, margin: '20px auto', textAlign: 'center' }}>
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

export const Login = ({ location: { search } }) => {
  const [error, setError] = useState(null)
  const { dispatch, user } = useStoreon('user')
  useEffect(() => {
    const { code } = parse(search.slice(1))
    const getData = async () => {
      const res = await fetch(`${site_url}/auth/token`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          client_id,
          code,
          grant_type: 'authorization_code',
          audience: site_url
        })
      })
      const data = await res.json()
      if (res.status !== 200) {
        console.log(data)
        setError(data.error_description)
      } else {
        dispatch('user/set-user-token', {
          token: data.access_token,
          user: data.userinfo
        })
        if (!data.userinfo.data || !data.userinfo.data.community) {
          history.push('/user')
        } else {
          history.push('/')
        }
      }
    }
    if (code) {
      getData()
    }
    return () => {}
  }, [search, dispatch])

  if (user) {
    return <div>Welcome {user.name ? user.name.formatted : user.email}</div>
  }
  if (error) {
    return <div>Auth error: {error}</div>
  }
  const { code } = parse(search.slice(1))
  if (!code) {
    return (
      <div style={{ textAlign: 'center', fontSize: '24px' }}>
        <a
          href={`${site_url}/auth/redirect/google?client_id=${client_id}&response_type=code`}
        >
          Login by Google
        </a>
        <br />
        <a
          href={`${site_url}/auth/redirect/github?client_id=${client_id}&response_type=code`}
        >
          Login by GitHub
        </a>
      </div>
    )
  }
  return <div>Auth in process</div>
}
