import React from 'react'

import cn from 'classnames'

import Section from '../Section'
import StatsChart from 'asset/statsImg.png'

import './style.css'

const Stats = ({ className = '' }) => (
  <Section className={cn(className, 'Stats')} heading="Статистика">
    <p className="Stats-Description">Профессиональный опыт участников</p>
    <img
      src={StatsChart}
      alt="Статистика участников"
      className="Stats-Chart"
      width="780px"
      height="468px"
    />
  </Section>
)

export default Stats
