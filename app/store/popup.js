const defaultState = {
  modalIsOpen: false,
  modalContent: null
}

export const POPUP_OPEN = 'popup/open'
export const POPUP_CLOSE = 'popup/close'

const popup = store => {
  store.on('@init', currentStore => ({ ...currentStore, popup: defaultState }))
  store.on(POPUP_OPEN, (currentStore, modalContent) => ({
    popup: {
      modalIsOpen: true,
      modalContent
    }
  }))
  store.on(POPUP_CLOSE, () => ({
    popup: { modalIsOpen: false, modalContent: null }
  }))
}

export default popup
