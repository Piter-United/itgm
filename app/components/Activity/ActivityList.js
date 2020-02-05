import React from 'react'

import { InnerPageContentContainer } from '../InnerPageContentContainer'
import ActivityListPage from './atoms/ActivityListPage'

export const WrappedActivityList = () => (
  <InnerPageContentContainer>
    <ActivityListPage />
  </InnerPageContentContainer>
)
