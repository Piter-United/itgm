import React from 'react'
import { Link, Route } from 'react-router-dom'
import useStoreon from 'storeon/react'

export default ({ component: Component, ...rest }) => {
  const { token } = useStoreon('token')
  if (!token) {
    return <div>Access Denied<br /><Link to="/login">Login</Link></div>
  }
  return <Route {...rest} component={Component} />
}
