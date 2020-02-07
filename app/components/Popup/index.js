import React from 'react'

import './style.css'

import ChangePasswordPopup from './ChangePasswordPopup'

const config = {
  ChangePasswordPopup: <ChangePasswordPopup />
}

const modalContent = 'ChangePasswordPopup'

const Popup = () => (
  <div className="Popup">
    {config[modalContent]}
    <button className="Popup-Close" />
  </div>
)

export default Popup
