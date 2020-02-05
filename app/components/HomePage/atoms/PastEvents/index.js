import React from 'react'

import cn from 'classnames'

import { Carousel } from 'antd'
import PageSection from 'components/PageSection'
import itgm11 from 'asset/itgm11.png'
import itgm12 from 'asset/itgm12.png'
import itgm13 from 'asset/itgm13.png'
import itgm14 from 'asset/itgm14.png'
import itgm15 from 'asset/itgm15.png'
import './style.css'

const slides = [
  {
    id: 1,
    img: `${itgm11}`,
    desc: 'Летний ITGM #15. 27 июля, Туутари Парк'
  },
  {
    id: 2,
    img: `${itgm12}`,
    desc: 'Slide description'
  },
  {
    id: 3,
    img: `${itgm13}`,
    desc: 'Slide description'
  },
  {
    id: 4,
    img: `${itgm14}`,
    desc: 'Slide description'
  },
  {
    id: 5,
    img: `${itgm15}`,
    desc: 'Slide description'
  }
]

const Slide = ({ id, img, desc }) => (
  <div className="Slide-Item" key={id}>
    <div className="Slide-Wrapper">
      <img src={img} alt="" className="Slide-Img" />
    </div>
    <p className="Slide-Description">{desc}</p>
  </div>
)

const PastEvents = ({ className = '' }) => (
  <PageSection className={cn('PastEvents', className)}>
    <div className="PastEvents-Wrapper">
      <h2 className="Heading PastEvents-Header">Прошедшие мероприятия</h2>
      <Carousel autoplay>
        {slides.map(slide => (
          <Slide {...slide} key={slide.id} />
        ))}
      </Carousel>
    </div>
  </PageSection>
)

export default PastEvents
