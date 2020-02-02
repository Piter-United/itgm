const defaultState = {
  filter: '',
  sort: false,
  list: [
    {
      id: 1,
      avatar: 'img.jpeg',
      firstName: 'Иван',
      lastName: 'Иванов',
      community: 'PiterJS'
    },
    {
      id: 2,
      avatar: 'img.jpeg',
      firstName: 'Иван',
      lastName: 'Иванов',
      community: 'SPb Python Community'
    },
    {
      id: 3,
      avatar: 'img.jpeg',
      firstName: 'Иван',
      lastName: 'Иванов',
      community: 'UX Analytics'
    }
  ]
}

export const GET_LIST = 'participant/get-list'

const participant = store => {
  store.on('@init', store => ({ ...store, participant: defaultState }))
}

export default participant
