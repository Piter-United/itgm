import React, { Fragment } from 'react'

import Hero from '../Hero/Hero'
import PageSection from '../PageSection/PageSection'
import ContentContainer from '../ContentContainer/ContentContainer'
import ActivityList from '../Activity/ActivityList'

import './HomePage.css'

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <PageSection>
        <ContentContainer>
          <ActivityList />
        </ContentContainer>
      </PageSection>

      <PageSection style={{ background: 'lightgray' }}>
        <ContentContainer>
          <p>PageSection</p>
        </ContentContainer>
      </PageSection>

      <PageSection style={{ background: 'gray' }}>
        <ContentContainer>
          <p>PageSection</p>
        </ContentContainer>
      </PageSection>

      <PageSection style={{ background: 'lightgray' }}>
        <ContentContainer>
          <p>PageSection</p>
        </ContentContainer>
      </PageSection>
    </Fragment>
  )
}

export default HomePage
