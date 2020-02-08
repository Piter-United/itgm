import React from 'react'

import Form from 'antd/lib/form/Form'
import { Input, Button } from 'antd'

const ChangePasswordEnterPasswordPopup = () => (
  <div className="Popup-Wrapper">
    <h2 className="Popup-Header">Изменить пароль</h2>
    <div className="Popup-Body">
      <p className="Popup-Text">
        Введите, пожалуйста, адрес email, чтобы мы могли отправить Вам письмо со
        ссылкой для смены пароля.
      </p>
      <Form className="Popup-Form">
        <Form.Item label="Пароль">
          <Input
            className="Popup-Input"
            placeholder="Минимум 6 символов и 1 цифра"
          />
        </Form.Item>
        <Form.Item label="Повторите Пароль">
          <Input className="Popup-Input" placeholder="Повторите пароль" />
        </Form.Item>
        <Button className="Popup-Submit" htmlType="submit" type="danger">
          Авторизоваться
        </Button>
      </Form>
    </div>
    <p className="Popup-Policy">
      Этим действием Вы подтверждаете согласие с нашей{' '}
      <a className="Popup-Link">Политикой Конфиденциальности</a> и соглашаетесь
      на обработку персональных данных.
    </p>
  </div>
)

export default ChangePasswordEnterPasswordPopup
