import React from 'react'

import './style.css'

import ChangePasswordEnterEmailPopup from './ChangePasswordEnterEmailPopup'
import ChangePasswordSendEmailPopup from './ChangePasswordSendEmailPopup'

const config = {
  ChangePasswordEnterEmailPopup: <ChangePasswordEnterEmailPopup />,
  ChangePasswordSendEmailPopup: <ChangePasswordSendEmailPopup />
}

const modalContent = 'ChangePasswordSendEmailPopup'

const Popup = () => (
  <div className="Popup">
    {config[modalContent]}
    <button className="Popup-Close" />
  </div>
)

export default Popup
