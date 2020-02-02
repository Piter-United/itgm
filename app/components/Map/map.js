import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import ymaps from 'ymaps'
import './map.css'

const createMap = props => {
  const { place, zoom, name, description } = props

  ymaps
    .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    .then(maps => {
      const map = new maps.Map('map', {
        center: [place[1], place[0]],
        zoom
      })
      const tpl = `
      <div class="home-map_block">
        <h4 class="home-map_name">${name}</h4>
        <p class="home-map_desc">${description}</p>
        <div class="home-map_buttons_wrapper">
          <a class="home-map_button_main" href="/">Зарегистрироваться</a>
          <a class="home-map_button_link" href="">Подробнее</a>
        </div>
      </div>
      `
      map.balloon.open([place[1], place[0]], tpl, {
        closeButton: false
      })
    })

    .catch(error => console.log('Failed to load Yandex Maps', error))
}

export default function Map() {
  const { dispatch, map } = useStoreon('map')

  useEffect(() => {
    createMap(map)
  })

  return (
    <div id="map" {...map}>
      <pre>map:{JSON.stringify(map, null, '\t')}</pre>
    </div>
  )
}
