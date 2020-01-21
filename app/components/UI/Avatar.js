import React from 'react'

const size = { default: '80px', participant: '80px', partner: '180px' }

const Avatar = ({ type, src, alt }) => {
  const avatarSize = size[type] ? size[type] : size.default

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: '50%'
      }}
    />
  )
}

export default Avatar
