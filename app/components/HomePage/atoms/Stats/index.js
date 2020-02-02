import React from 'react'

import cn from 'classnames'

import PageSection from 'components/PageSection'
import StatsChart from 'asset/statsImg.png'

import './style.css'

const Stats = ({ className = '' }) => (
  <PageSection className={cn('Stats', className)}>
    <div className="Stats-Wrapper">
      <h2 className={cn('Stats-Heading', 'Heading', 'Heading_level_1')}>
        Статистика
      </h2>
      <p className="Stats-Description">Профессиональный опыт участников</p>
      <img
        src={StatsChart}
        alt="Статистика участников"
        className="Stats-Chart"
        width="780px"
        height="468px"
      />
    </div>
  </PageSection>
)

export default Stats
