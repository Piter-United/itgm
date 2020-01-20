import React from 'react'

const Partners = () => {
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
  const renderPartners = () => (
    <ul className="partners__list">
      {partners.map(partner => (
        <li className="partners">
          <div className="partner-cnt">
            <img src={partner.img} alt="" className="partners__img" />
          </div>
          <h3 className="partners__header">{partner.name}</h3>
          <p className="partners__desc">{partner.desc}</p>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="container">
      <h2 className="partners__header">Партнеры</h2>
      <span className="partners__count">(8)</span>
      {renderPartners()}
    </div>
  )
}

export default Partners
