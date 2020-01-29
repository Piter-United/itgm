import React from 'react'
import cn from 'classnames'

import './style.css'

export const Social = ({ data = [], theme = 'default' }) =>
  data.length > 0 && (
    <ul className={cn('Social', `Social_theme_${theme}`)}>
      {data.map(({ Icon, url }) => (
        <li key={url} className="Social-Item">
          <a
            className="Social-Link"
            href={url}
            target="_blank"
            rel="nofollow noopener"
          >
            <Icon className="Social-Icon" />
          </a>
        </li>
      ))}
    </ul>
  )
