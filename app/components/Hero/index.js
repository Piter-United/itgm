import React from 'react'
import useStoreon from 'storeon/react'

import './style.css'

import { Button } from 'ui'
import { Link } from 'react-router-dom'

const ButtonRegistration = () => (
  <Button
    text="Зарегистрироваться"
    onClick={() => console.log('ok')}
    className="Hero-Register"
  />
)

const Hero = () => {
  const { user } = useStoreon('user')

  return (
    <div className="Hero">
      <div className="Hero-ContentWrapper">
        <div className="Hero-Content">
          <h1 className="Heading Hero-Heading">IT Global Meetup 16</h1>
          <p className="Hero-Description">
            Весенний слёт IT-сообществ Петербурга 28 марта 2020.
          </p>
          <div className="Hero-ButtonsWrapper">
            {user === null ? <ButtonRegistration /> : null}
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
