import React from 'react'

import cn from 'classnames'

import './style.css'

export const Button = ({
  text,
  size = 'm',
  type = 'button',
  color = 'primary',
  onClick,
  className = ''
}) => (
  <button
    className={cn(
      `Button Button_size_${size}`,
      `Button_color_${color}`,
      className
    )}
    type={type}
    onClick={onClick}
  >
    <span>{text}</span>
  </button>
)
