import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'
import NotFound from 'components/NotFound'

import routes from './routes'

const App = () => (
  <Switch>
    {routes.map(route =>
      route.private ? (
        <PrivateRoute path={route.path} component={route.component} />
      ) : (
        <Route path={route.path} exact component={route.component} />
      )
    )}
    <Route component={NotFound} />
  </Switch>
)

export default App
