import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'
import NotFound from 'components/NotFound'

import routes from './routes'
import Layout from './components/Layout'

import TryPage from './components/title_filter_sort/try_title_filter_sort'

const App = () => (
  <Switch>
    {routes.map(route =>
      route.private ? (
        <PrivateRoute
          key={route.path}
          path={route.path}
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
)

export default App
