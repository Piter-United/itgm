import React from 'react'
import Header from '../Header/Header'
import { Footer } from '../Footer'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const Layout = ({
  theme = 'default',
  component: Component,
  path,
  ...props
}) => {
  const isMainPage = path === '/'

  return isMainPage ? (
    <div className="out">
      <Header theme={theme} />
      <Component {...props} />

      <Footer theme={theme} />
    </div>
  ) : (
    <div className="out">
      <Header theme={theme} />
      <InnerPageContentContainer>
        <Component {...props} />
      </InnerPageContentContainer>
      <Footer theme={theme} />
    </div>
  )
}

export default Layout
