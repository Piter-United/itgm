import React from 'react'

import './style.css'

export const Button = ({
  text,
  size = 'm',
  type = 'button',
  color = 'primary',
  onClick
}) => (
  <button
    className={`Button Button_size_${size} Button_color_${color}`}
    type={type}
    onClick={onClick}
  >
    <span>{text}</span>
  </button>
)
