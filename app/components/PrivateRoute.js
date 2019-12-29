import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import useStoreon from 'storeon/react'

export default ({ component: Component, ...rest }) => {
  const { token, user, userLoading } = useStoreon(
    'token',
    'user',
    'userLoading'
  )
  if (!token) {
    return (
      <div>
        Access Denied
        <br />
        <Link to="/login">Login</Link>
      </div>
    )
  }
  if (userLoading) {
    return null
  }
  if (rest.path !== '/user/edit' && (!user || !user.community)) {
    return <Redirect to="/user/edit" />
  }
  return <Route {...rest} component={Component} />
}
