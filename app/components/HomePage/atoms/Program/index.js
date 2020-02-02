import React, { useEffect, useMemo } from 'react'
import cn from 'classnames'
import useStoreon from 'storeon/react'

import { GET_LIST } from 'store/activity'

import { List } from 'antd'
import PageSection from 'components/PageSection'
import { ShowItem } from 'components/Activity/ActivityList'
import { Button } from 'ui'

import './style.css'

const Activities = ({ activitiesData, dispatch, userId }) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={false}
    loading={activitiesData.loading}
    dataSource={activitiesData.list}
    renderItem={item => (
      <ShowItem key={item.id} userId={userId} item={item} dispatch={dispatch} />
    )}
  />
)

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
        <h2 className="Heading Heading_level_1 Program-Heading">
          Программа обсуждений
        </h2>
        <Activities
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
