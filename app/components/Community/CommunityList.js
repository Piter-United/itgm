import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Button, Typography, Row } from 'antd'
import TitleFilter from '../title_filter_sort/title_filter_sort'
import './CommunityList.css'

import useStoreon from 'storeon/react'

import VkIcon from '../../asset/vk.svg'
import { GET_LIST } from '../../store/community'
import history from '../../history'

const { Title } = Typography

const descStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2'
}

const CommunityListItem = item => (
  <div className="community-item" key={item.id}>
    <div className="community-item__header">
      <h3>
        <Link to={`/community/${item.id}`}>{item.name}</Link>
      </h3>
      <div className="community-item__desc">
        {item.description}
        <h4 className="community-item__more">
          <Link to={`/community/${item.id}`}>Подробнее</Link>
        </h4>
      </div>
    </div>
    <div className="community-item__img">
      <Avatar size={80} src={`https://www.gravatar.com/avatar/`} />
    </div>
  </div>
)

const mapper = (arr, iterator) => {
  try {
    return arr.map(iterator)
  } catch {
    ;<div>Список пуст!</div>
  }
}

const splitList = arr => {
  return [
    arr.map((v, i) => (i % 2 ? v : 0)).filter(v => v),
    arr.map((v, i) => (i % 2 ? v : 0)).filter(v => v)
  ]
}

const CommunityList = () => {
  const { user, community, dispatch } = useStoreon('community', 'user')
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  const titleProps = {
    name: 'Сообщества',
    counter: community.list ? community.list.length : 0
  }

  const [left, right] = splitList(community.list)
  return (
    <div className="container">
      <div className="header-wrapper">
        <TitleFilter {...titleProps} />
      </div>
      <Row style={{ display: 'flex', alignItems: 'baseline' }}>
        {user && (
          <Button className="community__button" href="/community/new">
            Добавить сообщество
          </Button>
        )}
      </Row>
      <div className="community__list">
        <div className="community__list_col">
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
