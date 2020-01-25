import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { parse } from 'qs'
import { Button, Icon, Typography } from 'antd'

import { client_id, site_url } from '../config'
import history from 'history'

import { GET_CURRENT_USER, SET_TOKEN, SET_USER_ID } from 'store/user'

import './Heading/Heading.css'
import './Form/_view/Form_view_auth.css'
import './List/_type/List_type_unstyled.css'
import './List/_view/List_view_auth.css'

const { Title } = Typography

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
        setError(data.error_description)
      } else {
        dispatch(SET_TOKEN, data.access_token)
        dispatch(SET_USER_ID, data.userinfo.id)
        setTimeout(() => {
          dispatch(GET_CURRENT_USER)
        }, 500)
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
    return (
      <div>
        Welcome
        {user.name ? user.name.formatted : user.email}
      </div>
    )
  }
  if (error) {
    return (
      <div>
        Auth error:
        {error}
      </div>
    )
  }
  const { code } = parse(search.slice(1))
  if (!code) {
    return (
      <div className="form form_view_auth" style={{ textAlign: 'center' }}>
        <header className="form__header">
          <Title level={1} className="heading heading_level_1 form__heading">
            Зарегистрироваться.
          </Title>
          <div className="form__subheading">
            Войдите с помощью существеющего аккаунта
            одной&nbsp;из&nbsp;представленных ниже социальных сетей.
          </div>
        </header>

        <div className="form__content">
          <ul className="list list_type_unstyled list_view_auth">
            <li className="list__item">
              <Button
                href={`${site_url}/auth/redirect/google?client_id=${client_id}&response_type=code`}
                size="large"
                block
              >
                <Icon type="google" />
                Login by Google
              </Button>
            </li>
            <li className="list__item">
              <Button
                href={`${site_url}/auth/redirect/github?client_id=${client_id}&response_type=code`}
                size="large"
                block
              >
                <Icon type="github" />
                Login by GitHub
              </Button>
            </li>
          </ul>
          <br />
        </div>

        <footer className="form__footer">
          Этим действием Вы подтверждаете согласие с нашей{' '}
          <a href="#">Политикой Конфиденциальности</a> и соглашаетесь на
          обработку персональных данных.
        </footer>
      </div>
    )
  }
  return <div>Auth in process</div>
}

export default Login
