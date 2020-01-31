import React from 'react'
import './Partners.css'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import Avatar from 'ui/Avatar'

const partners = [
  {
    id: 1,
    name: 'Important Partner Name',
    photo: 'img.jpeg',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    name: 'Important Partner Name',
    photo: 'img.jpeg',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]

const Partner = ({ id, img, name, desc }) => (
  <li className="partner" key={id}>
    <div className="partner__cnt">
      <Avatar
        type="user"
        size="xl"
        alt={name}
        src={img}
        className="partner__img"
      />
    </div>
    <h3 className="partner__header">{name}</h3>
    <p className="partner__desc">{desc}</p>
  </li>
)

const PartnerList = () => {
  return (
    <InnerPageContentContainer>
      <div className="partners">
        <div className="partners__wrapper">
          <h2 className="partners__header">Партнеры</h2>
          <span className="partners__count">({partners.length})</span>
        </div>
        <ul className="partners__list">
          {partners.map(partner => (
            <Partner {...partner} key={partner.id} />
          ))}
        </ul>
      </div>
    </InnerPageContentContainer>
  )
}

export default PartnerList
