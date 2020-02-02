const defaultState = {
  filter: '',
  community: '',
  loading: false,
  sort: false,
  list: []
}

export const GET_LIST = 'participant/get-list'
export const SET_LIST = 'participant/set-list'
export const ERROR = 'participant/error'
export const LOADING = 'participant/loading'
export const ON_FILTER = 'participant/on-filter'
export const ON_COMMUNITY = 'participant/on-community'
const participant = store => {
  store.on('@init', store => ({ ...store, participant: defaultState }))
  store.on(GET_LIST, s => {
    store.dispatch('request', {
      resourceType: 'UserProfile',
      params: {
        _assoc: 'community'
      },
      success: SET_LIST,
      error: ERROR,
      spinner: LOADING
    })
  })
  store.on(SET_LIST, (state, data) => {
    return {
      participant: {
        ...state.participant,
        list: data.entry
          .map(v => v.resource)
          .map(v => ({
            id: v.id,
            name: v.name,
            community: {
              name: v.community.resource.name,
              id: v.community.id
            },
            avatar: 'img.jpeg'
          }))
      }
    }
  })

  store.on(LOADING, (state, loading) => {
    return { participant: { ...state.participant, loading } }
  })

  store.on(ON_FILTER, (state, filter) => {
    return { ...state, participant: { ...state.participant, filter } }
  })

  store.on(ON_COMMUNITY, (state, community) => {
    return {
      ...state,
      participant: {
        ...state.participant,
        community: community === state.participant.community ? '' : community
      }
    }
  })
}

export default participant
