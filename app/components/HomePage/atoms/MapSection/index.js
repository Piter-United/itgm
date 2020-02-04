import React, { useEffect } from 'react'
import cn from 'classnames'
import ymaps from 'ymaps'
import { Link } from 'react-router-dom'

import PageSection from 'components/PageSection'
import { Button } from 'ui'

import './style.css'

const yandexMapConfig = {
  apiKey: process.env.YANDEX_MAP_API_KEY,
  zoom: 15,
  center: [59.98786, 30.178783],
  placemark: [59.98891, 30.188077]
}

const createMap = ({ apiKey, center, zoom, placemark }) => {
  ymaps
    .load(`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`)
    .then(maps => {
      const map = new maps.Map('map', {
        center,
        controls: [],
        zoom
      })

      const point = new maps.GeoObject(
        {
          geometry: {
            type: 'Point',
            coordinates: placemark
          },
          properties: {
            balloonContent: '',
            id: 1,
            iconContent: ''
          }
        },
        {
          draggable: false,
          preset: 'islands#icon',
          iconColor: '#F65762'
        }
      )

      map.geoObjects.add(point)
    })
    .catch(error => console.log('Failed to load Yandex Maps', error))
}

const MapSection = ({ className }) => {
  useEffect(() => createMap(yandexMapConfig))

  return (
    <PageSection className={cn(className, 'MapSection')}>
      <div className="MapSection MapSection-Address Address">
        <div className="Address-Container">
          <h3 className="Heading Address-Heading">Место проведения</h3>
          <p className="Address-Description">
            СПб, Приморский пр., 80/1 «Тинькофф Арена»
          </p>
          <div className="Address-Buttons">
            <Button
              className="Address-Register"
              text="Зарегистрироваться"
              asLink
              url="./login"
            />
            <Link className="Address-About" to="./about">
              Подробнее
            </Link>
          </div>
        </div>
      </div>
      <div
        id="map"
        className="MapSection-MapContainer"
        style={{ height: '520px' }}
      ></div>
    </PageSection>
  )
}

export default MapSection
