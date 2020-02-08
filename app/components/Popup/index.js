import React from 'react'

import './style.css'

import ChangePasswordEnterEmailPopup from './ChangePasswordEnterEmailPopup'
import ChangePasswordSendEmailPopup from './ChangePasswordSendEmailPopup'
import ChangePasswordEnterPasswordPopup from './ChangePasswordEnterPasswordPopup'

const config = {
  ChangePasswordEnterEmailPopup: <ChangePasswordEnterEmailPopup />,
  ChangePasswordSendEmailPopup: <ChangePasswordSendEmailPopup />,
  ChangePasswordEnterPasswordPopup: <ChangePasswordEnterPasswordPopup />
}

const modalContent = 'ChangePasswordEnterEmailPopup'

const Popup = () => (
  <div className="Popup">
    {config[modalContent]}
    <button className="Popup-Close" />
  </div>
)

export default Popup
