import React, { Fragment } from 'react'

import Hero from 'components/Hero'
import PageSection from '../PageSection/PageSection'
import ContentContainer from 'components/ContentContainer'
import ActivityList from '../Activity/ActivityList'
import Footer from 'components/Footer'
import Header from 'components/Header'

import './style.css'

const HomePage = () => {
  return (
    <Fragment>
      <div className="HomePage-FirstScreenWrapper">
        <Header theme="inverse" />
        <Hero />
      </div>
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
      <Footer theme="inverse" />
    </Fragment>
  )
}

export default HomePage
