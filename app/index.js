import React from 'react'
import { Router } from 'react-router-dom'
import StoreContext from 'storeon/react/context'

import history from './history'

import store from './store'

import './index.css'
import App from './App'

const initApp = () => (
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>
)

export default initApp
