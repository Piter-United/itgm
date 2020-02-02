const defaultState = {
  api: '48aaa052-afe3-4a84-97a7-957e8255594e',
  zoom: 15,
  place: [30.188077, 59.98891],
  name: 'Тинькофф Арена',
  description: 'СПб, Приморский пр.,80/1'
}

const map = store => {
  store.on('@init', s => ({ ...s, map: defaultState }))
}

export default map
