import React from 'react'

import cn from 'classnames'

import './style.css'

const PageSection = ({ children, style, className = '' }) => {
  return (
    <div className={cn('PageSection', className)} style={style}>
      {children}
    </div>
  )
}

export default PageSection
