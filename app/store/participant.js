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
export const SET_LIST = 'participant/set-list'
export const ERROR = 'participant/error'
export const LOADING = 'participant/loading'

const participant = store => {
  store.on('@init', store => ({ ...store, participant: defaultState }))
  store.on(GET_LIST, s => {
    store.dispatch('request', {
      resourceType: '$query',
      id: 'userinfo',
      params: {
        user: s.userId
      },
      success: SET_LIST,
      error: ERROR,
      spinner: LOADING
    })
  })
  store.on(SET_LIST, (state, data) => {
    // TODO: make request to backend for return sorted participants
    const participantListByNewest = [...data.data].sort(
      ({ ts: ts1 }, { ts: ts2 }) => {
        const date1 = new Date(ts1)
        const date2 = new Date(ts2)
        if (date1 > date2) return -1
        if (date2 < date1) return 1
        return 0
      }
    )
    return {
      participant: { ...state.participant, list: participantListByNewest }
    }
  })
  store.on(LOADING, (state, loading) => {
    return { activity: { ...state.activity, loading } }
  })
}

export default participant
