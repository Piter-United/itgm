import React, { useEffect, useMemo } from 'react'
import cn from 'classnames'
import useStoreon from 'storeon/react'

import { GET_LIST } from 'store/activity'

import { ActivityList } from 'components/Activity/atoms'
import { Button } from 'ui'

import './style.css'
import Section from '../Section'

const Program = ({ className = '' }) => {
  const { activity, userId, dispatch } = useStoreon('activity', 'userId')

  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])

  const topThreeActivitiesByLikesCount = useMemo(
    () =>
      activity.list
        .slice()
        .sort(
          (
            { likes: { count: count1 = 0 } },
            { likes: { count: count2 = 0 } }
          ) => count2 - count1
        )
        .slice(0, 3),
    [activity.list]
  )

  return (
    <Section
      className={cn(className, 'Program')}
      heading="Программа обсуждений"
    >
      <ActivityList
        dispatch={dispatch}
        activitiesData={{ ...activity, list: topThreeActivitiesByLikesCount }}
        userId={userId}
      />
      <Button
        className="Program-Button"
        text="Посмотреть все"
        asLink
        url="/activity"
      />
    </Section>
  )
}

export default Program
