import React from 'react'
import cn from 'classnames'

import './style.css'
import { Link } from 'react-router-dom'
/*
const ButtonForm = ({ text, size = 'm', color = 'primary', onClick }) => (
  <button
    className={cn('Button', `Button_size_${size}`, `Button_color_${color}`)}
    onClick={onClick}
  >
    <span>{text}</span>
  </button>
)

const ButtonLink = ({ href, text, size = 'm', color = 'primary' }) => (
  <a
    href={href}
    className={cn('Button', `Button_size_${size}`, `Button_color_${color}`)}
  >
    <span>{text}</span>
  </a>
)

export const Button = props => {
  switch (props.type) {
    case 'link':
      return ButtonLink(props)
    default:
      return ButtonForm(props)
  }
}
*/

export const Button = ({
  text,
  size = 'm',
  type = 'button',
  color = 'primary',
  onClick,
  className = '',
  asLink = false,
  url = '#'
}) =>
  asLink ? (
    <Link
      to={url}
      className={cn(
        `Button Button_size_${size}`,
        `Button_color_${color}`,
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
        className
      )}
      type={type}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  )
