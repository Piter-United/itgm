import React from 'react'

import './style.css'

import { Logo } from 'components/Logo'

import { Nav, Social } from './atoms'
import { navigation, social } from './config'
import { Link } from 'react-router-dom'

const Footer = ({ theme = 'default' }) => {
  return (
    <footer className={`Footer Footer_theme_${theme}`}>
      <div className="Footer-Inner">
        <div className="Footer-LogoContainer">
          <Link className="Footer-Logo" to="/">
            <Logo theme={theme} />
          </Link>
        </div>
        <div className="Footer-Nav">
          <Nav data={navigation} theme={theme} />
        </div>
        <div className="Footer-Social">
          <Social data={social} theme={theme} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
