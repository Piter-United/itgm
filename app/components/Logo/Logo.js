import React from 'react'
import cn from 'classnames'

import './Logo.css'

const Logo = ({ theme }) => {
  const classes = cn('logo', theme === 'dark' ? 'logo--theme-dark' : '')

  return <span className={classes}>ITGM</span>
}

export default Logo
