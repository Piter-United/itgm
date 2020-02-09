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
  <li className="Partner" key={id}>
    <div className="Partner-Container">
      <Avatar
        type="user"
        size="xl"
        alt={name}
        src={img}
        className="Partner-Img"
      />
    </div>
    <h3 className="Partner-Header">{name}</h3>
    <p className="Partner-Description">{desc}</p>
  </li>
)

const PartnerList = () => {
  return (
    <InnerPageContentContainer>
      <div className="Partners">
        <div className="Partners-Wrapper">
          <h2 className="Partners-Header">Партнеры</h2>
          <span className="Partners-Count">({partners.length})</span>
        </div>
        <ul className="Partners-List">
          {partners.map(partner => (
            <Partner {...partner} key={partner.id} />
          ))}
        </ul>
      </div>
    </InnerPageContentContainer>
  )
}

export default PartnerList
