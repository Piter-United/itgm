import React, { useEffect, useMemo } from 'react'
import cn from 'classnames'
import useStoreon from 'storeon/react'

import { GET_LIST } from 'store/community'

import { List, Avatar, Spin } from 'antd'
import Section from '../Section'

import './style.css'
import { Link } from 'react-router-dom'

// Моковые данные, выпилить после реализации подгрузки с бэка
const partnersList = Array.of(...new Array(6)).map((item, i) => ({ id: i }))
const partners = { loading: false, list: partnersList }

const PartnersListItem = ({ partner }) => (
  <li className="PartnersSection-ListItem">
    <Link to={`/partners/${partner.id}`}>
      <Avatar size={175} />
    </Link>
  </li>
)

const PartnersList = ({ partnersData }) =>
  partnersData.loading ? (
    <Spin />
  ) : (
    <ul className="PartnersSection-List">
      {partnersData.list.map(partner => (
        <PartnersListItem key={partner.id} partner={partner} />
      ))}
    </ul>
  )

const PartnersSection = ({ className = '' }) => {
  // const { community, dispatch } = useStoreon('community')

  // useEffect(() => {
  //   dispatch(GET_LIST)
  // }, [dispatch])

  return (
    <Section
      className={cn(className, 'PartnersSection', 'Section_align_center')}
      heading="Партнеры"
    >
      <PartnersList partnersData={partners} />
    </Section>
  )
}

export default PartnersSection
