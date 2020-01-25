import React from 'react'

import './style.css'

const Avatar = ({ type = 'default', src, alt, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`Avatar Avatar_size_${type} ${className}`}
    />
  )
}

export default Avatar
