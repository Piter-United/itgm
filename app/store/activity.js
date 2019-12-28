import { notification } from 'antd'

const defaultState = {
  activity: {
    list: [],
    loading: false
  }
}

export const GET_LIST = 'activity/get-list'
export const SET_LIST = 'activity/set-list'
export const LOADING = 'activity/loading'
export const ERROR = 'activity/error'

const activity = store => {
  store.on('@init', () => defaultState)
  store.on(GET_LIST, s => {
    store.dispatch('request', {
      resourceType: '$query',
      id: 'activity',
      params: {
        user: s.user.id
      },
      success: SET_LIST,
      error: ERROR,
      spinner: LOADING
    })
  })
  store.on(LOADING, (s, loading) => {
    return { activity: { ...s.activity, loading } }
  })
  store.on(SET_LIST, (s, data) => {
    return {
      activity: { ...s.activity, list: data.data }
    }
  })
  store.on(ERROR, (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message })
    } else {
      notification.error({ message })
    }
  })
}

export default activity
