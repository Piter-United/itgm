import { notification } from 'antd'
import history from '../history'

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
export const LIKE = 'activity/like'
export const UPDATE_LIKE_SUCCESS = 'activity/update-like-success'
export const UPDATE_LIKE_ERROR = 'activity/update-like-error'
export const UNLIKE = 'activity/unlike'
export const UPDATE_UNLIKE_SUCCESS = 'activity/update-unlike-success'
export const UPDATE_UNLIKE_ERROR = 'activity/update-unlike-error'
export const CREATE = 'activity/create'
export const CREATE_SUCCESS = 'activity/create-success'

const activity = store => {
  store.on('@init', () => defaultState)
  store.on(GET_LIST, s => {
    store.dispatch('request', {
      resourceType: '$query',
      id: 'activity',
      params: {
        user: s.userId
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
  store.on(LIKE, (s, id) => {
    store.dispatch('request', {
      resourceType: 'ActivityLike',
      method: 'post',
      body: {
        user: {
          resourceType: 'User',
          id: s.userId
        },
        activity: {
          resourceType: 'Activity',
          id
        }
      },
      success: UPDATE_LIKE_SUCCESS,
      error: UPDATE_LIKE_ERROR
    })
  })
  store.on(UPDATE_LIKE_SUCCESS, (s, data) => {
    notification.success({ message: 'Все гуд, лайк записан' })
    return {
      activity: {
        list: s.activity.list.map(v => {
          if (v.id === data.activity.id) {
            return {
              ...v,
              likes: {
                id: data.id,
                count: v.likes.count + 1,
                isLike: true
              }
            }
          }
          return v
        }),
        loading: false
      }
    }
  })
  store.on(UPDATE_LIKE_ERROR, (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message })
    } else {
      notification.error({ message })
    }
  })
  store.on(UNLIKE, (s, id) => {
    store.dispatch('request', {
      resourceType: 'ActivityLike',
      id,
      method: 'delete',
      success: UPDATE_UNLIKE_SUCCESS,
      error: UPDATE_UNLIKE_ERROR
    })
  })
  store.on(UPDATE_UNLIKE_SUCCESS, (s, data) => {
    console.log(s.activity, data)
    notification.success({ message: 'Все гуд, лайк убрали' })
    return {
      activity: {
        list: s.activity.list.map(v => {
          if (v.id === data.activity.id) {
            return {
              ...v,
              likes: {
                id: data.id,
                count: v.likes.count - 1,
                isLike: false
              }
            }
          }
          return v
        }),
        loading: false
      }
    }
  })
  store.on(UPDATE_LIKE_ERROR, (s, { data, message }) => {
    console.log(s.activity, data)
    if (data && data.message) {
      notification.error({ message: data.message })
    } else {
      notification.error({ message })
    }
  })
  store.on(CREATE, (s, newCommunity) => {
    store.dispatch('request', {
      resourceType: 'Activity',
      body: newCommunity,
      method: 'POST',
      success: CREATE_SUCCESS,
      error: ERROR,
      spinner: LOADING
    })
  })
  store.on(CREATE_SUCCESS, (s, newCommunity) => {
    console.log(`newCommunity`, newCommunity)
    history.push(`/`)
  })
}

export default activity
