import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import PageSection from 'components/PageSection'
import { Button } from 'ui'

import './style.css'

const Description = ({ className = '' }) => (
  <PageSection className={cn(className, 'Description')}>
    <div className="Description-HeroWrapper">
      <div className="Description-Hero">
        <h2 className={cn('Description-Heading', 'Heading', 'Heading_level_1')}>
          Более двадцати сообществ
        </h2>
        <p className="Description-Text">
          Слет сообществ проводится 2-3 раза в год и собирает на одной площадке
          800+ специалистов из 200+ IT-компаний Петербурга. В каждом слете
          участвует от 20 до 30 городских IT-сообществ.
        </p>
        <div className="Description-ButtonsWrapper">
          <Button
            text="Зарегистрироваться"
            className="Description-Register"
            asLink
            url="/login"
            color="secondary"
          />
          <Link className="Description-About" to="/about">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  </PageSection>
)

export default Description
