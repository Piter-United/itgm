import React from 'react'

import './PageSection.css'

const PageSection = ({ children, style }) => {
  return (
    <div className="page-section" style={style}>
      {children}
    </div>
  )
}

export default PageSection
