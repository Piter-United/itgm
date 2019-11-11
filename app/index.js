import React from 'react'
import { Router } from 'react-router-dom'
import StoreContext from 'storeon/react/context'
import connect from 'storeon/react/connect'

import history from './history'

import store from './store'

import './index.css'
import App from './App'

class LocationListener extends React.Component {
  componentWillMount() {
    const { history } = this.props
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange)
    this.handleLocationChange(history.location)
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
  }

  handleLocationChange = location => {
    if (this.props.user) {
      if (
        location.pathname !== '/user' &&
        (!this.props.user.data || !this.props.user.data.community)
      ) {
        this.props.history.push('/user')
      }
    }
  }

  render() {
    return this.props.children
  }
}

const LocationListenerComp = connect(
  'user',
  LocationListener
)

const initApp = () => (
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <LocationListenerComp history={history}>
        <App />
      </LocationListenerComp>
    </Router>
  </StoreContext.Provider>
)

export default initApp
