import React, { useEffect, useMemo } from 'react'
import cn from 'classnames'
import useStoreon from 'storeon/react'

import { GET_LIST } from 'store/community'
import { CommunityList } from 'components/Community/CommunityList'
import Section from '../Section'
import { Button } from 'components/UI'

import './style.css'

const Communities = ({ className = '' }) => {
  const { community, dispatch } = useStoreon('community')

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  return (
    <Section className={cn(className, 'Communities')} heading="Сообщества">
      <CommunityList
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
