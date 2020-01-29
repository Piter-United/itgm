import React from 'react'
import Header from '../Header/Header'
import { Footer } from '../Footer'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const Layout = ({ theme = 'default', component: Component, ...props }) => (
  <div className="out">
    <Header theme={theme} />
    <InnerPageContentContainer>
      <Component {...props} />
    </InnerPageContentContainer>
    <Footer theme={theme} />
  </div>
)

export default Layout
