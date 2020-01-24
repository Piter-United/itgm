import React, { useEffect } from 'react'

import './Participants.css'

import { List, Icon, Button, Typography, Row, Col, Divider } from 'antd'

const { Title } = Typography

import Avatar from '../UI/Avatar'

const Participant = ({ id, img, name, desc }) => (
  <li className="participant" key={id}>
    <div className="partner__cnt">
      <img src={img} alt="" className="partner__img" />
    </div>
    <h3 className="partner__header">{name}</h3>
    <p className="partner__desc">{desc}</p>
  </li>
)

const ParticipantList = () => (
  <div className="participants">
    <div className="participants__wrapper">
      <h2 className="participants_header">Участники конференции</h2>
      <p className="participants__count">(789)</p>
      <p className="participants__find">find</p>
      <p className="participants__sort">sort</p>
    </div>
    <ul className="participants__list">
      {/* {partners.map(partner => (
				<Partner {...partner} key={partner.id} />
			))} */}
    </ul>
  </div>
)

export default ParticipantList
