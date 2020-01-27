import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import cn from 'classnames'

import './style.css'

export const Nav = withRouter(
  ({ data, theme = 'default' }) =>
    data.length > 0 && (
      <div className={cn('Nav', `Nav_theme_${theme}`)} theme={theme}>
        {data.map((columnData, i) => (
          <ul className="Nav__Column" key={i}>
            {columnData.map(({ text, url }) => (
              <li key={`${text}_${url}`} className="Nav__Item">
                <Link to={url} className="Nav__Link">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    )
)
