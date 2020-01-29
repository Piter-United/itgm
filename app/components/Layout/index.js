import React from 'react'
import Header from '../Header/Header'
import { Footer } from '../Footer'

const Layout = ({ theme = 'default', component: Component, props }) => (
  <div className="out">
    <Header theme={theme} />
    <Component {...props} />
    <Footer theme={theme} />
  </div>
)

export default Layout
