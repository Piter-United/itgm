import React from 'react'
import { InnerPageContentContainer } from '../InnerPageContentContainer'
import ActivityListPage from './atoms/ActivityListPage'
import ActivityListHomePage from './atoms/ActivityListHomePage'

export const WrappedActivityList = () => (
  <InnerPageContentContainer>
    <ActivityListPage />
  </InnerPageContentContainer>
)

export default ActivityListHomePage
