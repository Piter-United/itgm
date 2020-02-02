import React, { useEffect, useMemo } from 'react'
import cn from 'classnames'
import useStoreon from 'storeon/react'

import { GET_LIST } from 'store/activity'

import PageSection from 'components/PageSection'
import { ActivityList } from 'components/Activity/atoms'
import { Button } from 'ui'

import './style.css'

const Program = ({ className = '' }) => {
  const { activity = [], userId, dispatch } = useStoreon('activity', 'userId')

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
    <PageSection className={cn(className, 'Program')}>
      <div className="Program-Wrapper">
        <h2 className="Heading Program-Heading">Программа обсуждений</h2>
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
      </div>
    </PageSection>
  )
}

export default Program
