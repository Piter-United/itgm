import React from 'react'

const Popup = () => (
  <div className="Popup">
    <div className="Popup-Wrapper">
      <h2 className="Popup-Header">Изменить пароль</h2>
      <div className="Popup-Body"></div>
      <p className="Popup-Policy">
        Этим действием Вы подтверждаете согласие с нашей{' '}
        <a className="Popup-Link">Политикой Конфиденциальности</a> и
        соглашаетесь на обработку персональных данных.
      </p>
    </div>
    <button className="Popup-Close">x</button>
  </div>
)

export default Popup
