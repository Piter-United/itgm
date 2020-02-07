import React from 'react'
import cn from 'classnames'

import './style.css'
import { Link } from 'react-router-dom'

export const Button = ({
  text,
  size = 'm',
  type = 'button',
  color = 'primary',
  onClick,
  className = '',
  asLink = false,
  url = '#',
  fluid = false,
  style = {}
}) =>
  asLink ? (
    <Link
      to={url}
      style={{ ...style }}
      className={cn(
        `Button Button_size_${size}`,
        `Button_color_${color}`,
        fluid && `Button_fluid`,
        className
      )}
    >
      {text}
    </Link>
  ) : (
    <button
      className={cn(
        `Button Button_size_${size}`,
        `Button_color_${color}`,
        fluid && `Button_fluid`,
        className
      )}
      type={type}
      style={{ ...style }}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  )
