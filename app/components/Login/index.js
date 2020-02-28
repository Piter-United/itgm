import React from 'react'
import useStoreon from 'storeon/react'
// import { parse } from 'qs'
import { Form, Input, Typography } from 'antd'
import { Button as ButtonCustom } from 'components/UI'
// import { client_id, site_url } from '../../config'
// import history from '../../history'

import { LOGIN } from 'store/user'

import '../Heading/Heading.css'
import '../Form/_view/Form_view_auth.css'
import '../List/_type/List_type_unstyled.css'
import '../List/_view/List_view_auth.css'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const { Title } = Typography

const LoginForm = ({ form, onLogin }) => {
  const { getFieldDecorator, validateFieldsAndScroll } = form
  const handleSubmit = e => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onLogin(values)
      }
    })
  }
  return (
    <Form className="form" layout="vertical" onSubmit={handleSubmit}>
      <Form.Item
        label={<strong>E-mail</strong>}
        style={{ marginBottom: '14px' }}
      >
        {getFieldDecorator('username', {
          initialValue: null,
          rules: [
            {
              type: 'email',
              message: 'Не соответствует требованиям E-mail'
            },
            {
              required: true,
              message: 'Вы не ввели E-mail'
            }
          ]
        })(<Input style={{ padding: '12px', height: '44px' }} />)}
      </Form.Item>
      <Form.Item label={<strong>Пароль</strong>}>
        {getFieldDecorator('password', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: 'Вы не ввели пароль'
            }
          ]
        })(
          <Input
            type={'password'}
            style={{ padding: '12px', height: '44px' }}
          />
        )}
      </Form.Item>
      <Form.Item>
        <ButtonCustom type="submit" text="Войти" fluid />
        <div style={{ marginTop: '10px' }} />
        <ButtonCustom
          asLink
          text="Зарегистрироваться"
          color="secondary"
          fluid
          url="http://piter-united.ru"
        />
      </Form.Item>
    </Form>
  )
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm)

const Login = ({ location: { search } }) => {
  const { dispatch, user } = useStoreon('user')

  if (user) {
    return (
      <div>
        Welcome
        {user.name ? user.name.formatted : user.email}
      </div>
    )
  }
  const onLogin = values => {
    dispatch(LOGIN, values)
  }
  return (
    <InnerPageContentContainer>
      <div className="form form_view_auth" style={{ textAlign: 'center' }}>
        <header className="form__header">
          <Title level={1} className="Heading Heading_level_1 form__heading">
            Вход
          </Title>
          {/*<div className="form__subheading">*/}
          {/*  Войдите с помощью существеющего аккаунта*/}
          {/*  одной&nbsp;из&nbsp;представленных ниже социальных сетей.*/}
          {/*</div>*/}
        </header>

        <div className="form_content">
          <WrappedLoginForm onLogin={onLogin} />
        </div>
        {/*<div className="form__content">*/}
        {/*  <ul className="list list_type_unstyled list_view_auth">*/}
        {/*    <li className="list__item">*/}
        {/*      <Button*/}
        {/*        href={`${site_url}/auth/redirect/google?client_id=${client_id}&response_type=code`}*/}
        {/*        size="large"*/}
        {/*        block*/}
        {/*      >*/}
        {/*        <Icon type="google" />*/}
        {/*        Login by Google*/}
        {/*      </Button>*/}
        {/*    </li>*/}
        {/*    <li className="list__item">*/}
        {/*      <Button*/}
        {/*        href={`${site_url}/auth/redirect/github?client_id=${client_id}&response_type=code`}*/}
        {/*        size="large"*/}
        {/*        block*/}
        {/*      >*/}
        {/*        <Icon type="github" />*/}
        {/*        Login by GitHub*/}
        {/*      </Button>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*  <br />*/}
        {/*</div>*/}

        {/*<footer className="form__footer">*/}
        {/*  Этим действием Вы подтверждаете согласие с нашей{' '}*/}
        {/*  <a href="#">Политикой Конфиденциальности</a> и соглашаетесь на*/}
        {/*  обработку персональных данных.*/}
        {/*</footer>*/}
      </div>
    </InnerPageContentContainer>
  )
}

export default Login
