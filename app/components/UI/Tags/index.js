import React from 'react'

import './style.css'

export const Tags = ({ data }) => {
  return (
    <ul className="Tags">
      {data.map((name, i) => (
        <li key={i} className="Tags__Item">
          <Tag name={name} />
        </li>
      ))}
    </ul>
  )
}

export const Tag = ({ name, link }) => (
  <a href={link || '#'} className="Tags__Tag" title={name}>
    {name}
  </a>
)
