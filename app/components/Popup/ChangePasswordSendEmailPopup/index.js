import React from 'react'
import './style.css'

const ChangePasswordSendEmailPopup = () => (
  <div className="Popup-Wrapper">
    <h2 className="Popup-Header Popup-Header-mb85">Изменить пароль</h2>
    <div className="Popup-Body">
      <p className="Popup-Text Popup-Text-mb90 Popup-Text-fs22">
        На Ваш адрес email было отправлено письмо. Пожалуйста, перейдите по
        ссылке в письме для того, чтобы изменить пароль. Если письма нет,
        проверьте папку “Спам”.
      </p>
    </div>
    <p className="Popup-Policy">
      Этим действием Вы подтверждаете согласие с нашей{' '}
      <a className="Popup-Link">Политикой Конфиденциальности</a> и соглашаетесь
      на обработку персональных данных.
    </p>
  </div>
)

export default ChangePasswordSendEmailPopup
