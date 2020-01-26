import React from 'react'

import './style.css'

const Avatar = ({ type = 'user', size = 'l', src, alt, className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`Avatar Avatar_size_${size} Avatar_type_${type} ${className}`}
    />
  )
}

export default Avatar
