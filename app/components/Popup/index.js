import React, { useCallback } from 'react'
import useStoreon from 'storeon/react'

import './style.css'

import { POPUP_CLOSE } from 'store/popup'

import ChangePasswordEnterEmailPopup from './ChangePasswordEnterEmailPopup'
import ChangePasswordSendEmailPopup from './ChangePasswordSendEmailPopup'
import ChangePasswordEnterPasswordPopup from './ChangePasswordEnterPasswordPopup'

const config = {
  ChangePasswordEnterEmailPopup: <ChangePasswordEnterEmailPopup />,
  ChangePasswordSendEmailPopup: <ChangePasswordSendEmailPopup />,
  ChangePasswordEnterPasswordPopup: <ChangePasswordEnterPasswordPopup />
}

/*
Как пользоваться:

import { POPUP_OPEN } from 'store/popup'

<Button
  text="OPEN MODAL"
  onClick={() => {
    dispatch(POPUP_OPEN, 'ChangePasswordEnterEmailPopup')
  }}
/>
*/

const Popup = () => {
  const { popup, dispatch } = useStoreon('popup')
  const closeModal = useCallback(() => {
    dispatch(POPUP_CLOSE)
  }, [dispatch])

  return (
    <div className="Popup">
      <div className="Popup-Container">
        <button onClick={closeModal} className="Popup-Close" />
        {config[popup.modalContent] || 'jopalala'}
      </div>
    </div>
  )
}

export default Popup
