import React from 'react'
import cn from 'classnames'

import './style.css'

export const Logo = ({ theme = 'default' }) => {
  const classes = cn('Logo', `Logo_theme_${theme}`)

  return <span className={classes}>ITGM</span>
}
