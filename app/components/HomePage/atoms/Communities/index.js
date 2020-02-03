import React, { useEffect, useMemo } from 'react'
import cn from 'classnames'
import useStoreon from 'storeon/react'

import { GET_LIST } from 'store/community'

import { List, Avatar } from 'antd'
import Section from '../Section'
import { Button } from 'ui'

import './style.css'
import { Link } from 'react-router-dom'

const CommunitiesListItem = ({ community }) => (
  <List.Item className="Communities-ListItem CommunityCard" key={community.id}>
    <div className="CommunityCard-Content">
      <div>
        <h3 className="CommunityCard-Heading">{community.name}</h3>
        <p className="CommunityCard-Description">{community.description}</p>
        <Link to={`/community/${community.id}`} className="CommunityCard-Link">
          Подробнее —
        </Link>
      </div>
      <Avatar size={102} style={{ flexShrink: 0 }} />
    </div>
  </List.Item>
)

const CommunitiesList = ({ className = '', communitiesData }) => (
  <List
    className={cn('Communities-List', className)}
    grid={{ gutter: 16, column: 2 }}
    size="large"
    pagination={false}
    loading={communitiesData.loading}
    dataSource={communitiesData.list}
    renderItem={community => <CommunitiesListItem community={community} />}
  />
)

const Communities = ({ className = '' }) => {
  const { community, dispatch } = useStoreon('community')

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <Section
      className={cn(className, 'Communities')}
      heading="Программа обсуждений"
    >
      <CommunitiesList
        communitiesData={{ ...community, list: community.list.slice(0, 4) }}
      />
      <Button
        className="Communities-Button"
        text="Посмотреть все"
        asLink
        url="/community"
      />
    </Section>
  )
}

export default Communities
