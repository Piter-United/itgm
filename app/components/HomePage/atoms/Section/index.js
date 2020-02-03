import React from 'react'
import cn from 'classnames'

import PageSection from 'components/PageSection'

import './style.css'

const Section = ({ className = '', children, heading = '' }) => (
  <PageSection className={cn(className, 'Section')}>
    <div className="Section-Wrapper">
      <h2 className="Heading Section-Heading">{heading}</h2>
      {children}
    </div>
  </PageSection>
)

export default Section
