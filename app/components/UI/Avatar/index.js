import React, { useCallback } from 'react'
import cn from 'classnames'

import './style.css'

import defaultAvatarSrc from 'asset/userFallbackAvatar.png'

export const Avatar = ({
  type = 'user',
  size = 'l',
  src = defaultAvatarSrc,
  alt,
  className = ''
}) => {
  const onError = useCallback(evt => {
    evt.target.src = defaultAvatarSrc
  }, [])
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        `Avatar Avatar_size_${size}`,
        `Avatar_type_${type}`,
        className
      )}
      onError={onError}
    />
  )
}

export default Avatar
