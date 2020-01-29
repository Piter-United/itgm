import React from 'react'
import cn from 'classnames'

import './style.css'

export const InnerPageContentContainer = ({ className = '', children }) => (
  <div className={cn('InnerPageContentContainer', className)}>
    <div className="InnerPageContentContainer-Inner">{children}</div>
  </div>
)
