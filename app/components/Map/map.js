import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import ymaps from 'ymaps'
import './map.css'

const createMap = props => {
  const { api, place, zoom, name, description } = props

  ymaps
    .load(`https://api-maps.yandex.ru/2.1/?apikey=${api}&lang=ru_RU`)
    .then(maps => {
      const map = new maps.Map('map', {
        center: [place[1], place[0]],
        controls: [],
        zoom
      })
      const tpl = `
      <div class="home-map_block">
        <h4 class="home-map_name">Место проведения</h4>
        <p class="home-map_desc">${description}<br>${name}</p>
        <div class="Hero-ButtonsWrapper">
          <a class="Button Button_size_m Button_color_primary Hero-Register" href="/login">Зарегистрироваться</a>
          <a class="" href="">Подробнее</a>
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
