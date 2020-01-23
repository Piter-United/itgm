import React, { useState } from 'react'
import cn from 'classnames'

import './Burger.css'

const Burger = ({ theme, onClick }) => {
  const [isBurgerActive, changeBurgerIsActive] = useState(false)

  const onClickHandler = e => {
    changeBurgerIsActive(!isBurgerActive)
    onClick(e)
  }

  const classes = cn(
    'burger',
    isBurgerActive ? 'is-active' : '',
    theme === 'dark' ? 'burger--theme-dark' : ''
  )

  return (
    <button className={classes} onClick={onClickHandler}>
      <span className="burger__icon"></span>
    </button>
  )
}

export default Burger
