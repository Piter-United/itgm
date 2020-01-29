import React from 'react'

import './style.css'

export const ButtonLink = ({ href, text, size = 'm', color = 'primary' }) => (
  <a href={href} className={`Button Button_size_${size} Button_color_${color}`}>
    <span>{text}</span>
  </a>
)
