import React from 'react'
import './Partners.css'

const partners = [
  {
    name: 'Important Partner Name',
    photo: 'img.jpeg',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    name: 'Important Partner Name',
    photo: 'img.jpeg',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]

const Partner = () => (
  <ul className="partners__list">
    {partners.map(partner => (
      <li className="partners-item">
        <div className="partner-cnt">
          <img src={partner.img} alt="" className="partners-item__img" />
        </div>
        <h3 className="partners-item__header">{partner.name}</h3>
        <p className="partners-item__desc">{partner.desc}</p>
      </li>
    ))}
  </ul>
)

const PartnerList = () => {
  return (
    <div className="container">
      <div className="header-wrapper">
        <h2 className="partners__header">Партнеры</h2>
        <span className="partners__count">({partners.length})</span>
      </div>
      {Partner()}
    </div>
  )
}

export default PartnerList
