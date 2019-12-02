import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { parse } from 'qs'
import { client_id, site_url } from '../config'
import history from '../history'

const Login = ({ location: { search } }) => {
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
          history.push('/user/edit')
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

export default Login
