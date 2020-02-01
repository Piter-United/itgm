import React from 'react'
import Header from '../Header/Header'
import { Footer } from '../Footer'
import './style.css'

const Layout = ({ theme = 'default', component: Component, ...props }) => (
  <div className="Layout">
    <Header theme={theme} />
    <Component {...props} />
    <Footer theme={theme} />
  </div>
)

export default Layout
