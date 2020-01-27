import React from 'react'

import './style.css'

import { Logo } from 'components/Logo'

import { Nav, Social } from './atoms'
import { navigation, social } from './config'
import { Link } from 'react-router-dom'

export const Footer = ({ theme = 'default' }) => {
  return (
    <footer className={`Footer Footer_theme_${theme}`}>
      <div className="Footer__Inner">
        <div className="Footer__Logo">
          <Link to="/">
            <Logo theme={theme} />
          </Link>
        </div>
        <div className="Footer__Nav">
          <Nav data={navigation} theme={theme} />
        </div>
        <div className="Footer__Social">
          <Social data={social} theme={theme} />
        </div>
      </div>
    </footer>
  )
}
