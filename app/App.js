import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import useStoreon from 'storeon/react'

import PrivateRoute from 'components/PrivateRoute'
import NotFound from 'components/NotFound'
import Layout from 'components/Layout'
import Popup from 'components/Popup'

import routes from './routes'

const App = () => {
  const { popup } = useStoreon('popup')

  return (
    <Fragment>
      {popup.modalIsOpen && <Popup />}
      <Switch>
        {routes.map(route =>
          route.private ? (
            <PrivateRoute
              key={route.path}
              path={route.path}
              exact
              component={props => (
                <Layout
                  theme={route.theme}
                  component={route.component}
                  {...props}
                />
              )}
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={props => (
                <Layout
                  theme={route.theme}
                  component={route.component}
                  {...props}
                />
              )}
            />
          )
        )}
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  )
}

export default App
