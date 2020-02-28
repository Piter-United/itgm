import React from 'react'

import './style.css'

import { Button } from 'components/UI'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="Hero">
      <div className="Hero-ContentWrapper">
        <div className="Hero-Content">
          <h1 className="Heading Hero-Heading">IT Global Meetup 16</h1>
          <p className="Hero-Description">
            Весенний слёт IT-сообществ Петербурга 28 марта 2020.
          </p>
          <div className="Hero-ButtonsWrapper">
            <Button
              text="Зарегистрироваться"
              className="Hero-Register"
              asLink
              url="/login"
            />
            <Link className="Hero-About" to="/about">
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
