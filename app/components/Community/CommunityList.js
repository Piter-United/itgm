import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Button, Typography, Row } from 'antd'
import TitleFilter from '../title_filter_sort/title_filter_sort'
import CommunityListItem from './CommunityListItem'
import './CommunityList.css'

import useStoreon from 'storeon/react'

import VkIcon from '../../asset/vk.svg'
import { GET_LIST, ON_FILTER } from '../../store/community'
import history from '../../history'

const { Title } = Typography
const mapper = (arr, Iterator) => {
  try {
    return arr.map(v => <Iterator key={v.id} {...v} />)
  } catch (e) {
    console.log('mapper error', e)
    // <div>Список пуст!</div>
  }
}

const splitList = arr => {
  if (arr.length === 1) {
    return [[arr[0]], []]
  }
  return [
    arr.map((v, i) => (i % 2 ? v : 0)).filter(v => v),
    arr.map((v, i) => (!(i % 2) ? v : 0)).filter(v => v)
  ]
}

const CommunityList = props => {
  console.log(props)
  const { user, community, dispatch } = useStoreon('community', 'user')
  const [filtered, setFiltered] = useState(community.list)
  // console.log(filtered, community.list)

  const filterCommunites = sInputValue => {
    if (sInputValue === '') {
      return setFiltered(community.list)
    }

    const isCommunityLike = filterCommunity(sInputValue)
    // console.log("filtered filter", community.list.filter(isCommunityLike))
    // console.log("filtered map", community.list.map(v=>isCommunityLike(v)))
    setFiltered(community.list.filter(isCommunityLike))
  }

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  useEffect(() => {
    filterCommunites(community.filter)
  }, [community.list, community.filter])

  const titleProps = {
    name: 'Сообщества',
    counter: community.list ? community.list.length : 0,
    filter: community.filter,
    onFilter: value => dispatch(ON_FILTER, value),
    onSort: console.log
  }

  const [left, right] = splitList(filtered)
  return (
    <div className="container">
      <div className="header-wrapper">
        <TitleFilter {...titleProps} />
      </div>
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        {user && (
          <Link className="community__button" to="/community/new">
            Добавить сообщество
          </Link>
        )}
      </Row>
      <div className="community__list">
        <div className="community__list_col">
          {console.log(left)}
          {mapper(left, CommunityListItem)}
        </div>
        <div className="community__list_col">
          {mapper(right, CommunityListItem)}
        </div>
      </div>
    </div>
  )
}

export default CommunityList

// libs
const filterCommunity = payload => {
  const lowPayload = payload.toLowerCase()
  return ({ name, description }) => {
    const data = [name, description].join(' ').toLowerCase()
    const place = data.indexOf(lowPayload)
    return place !== -1
  }
}
