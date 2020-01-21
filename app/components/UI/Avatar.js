import React from 'react'

const size = { participant: '80px', partner: '180px' }

const Avatar = ({ type, src, alt }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: size[type],
      height: size[type],
      borderRadius: '50%'
    }}
  />
)

export default Avatar
