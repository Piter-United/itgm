import { notification } from 'antd'
import history from '../history'

const defaultState = {
  token: window.localStorage.getItem('token') || null,
  userId: window.localStorage.getItem('userId') || null,
  userLoading: true,
  user: null
}
export const SET_USER_TOKEN = 'user/set-user-token'
export const SET_USER_ID = 'user/set-user-id'
export const SET_USER = 'user/set-user'
export const SET_TOKEN = 'user/set-token'
export const GET_CURRENT_USER = 'user/get-current-user'
export const UPDATE_USER = 'user/update'
export const UPDATE_USER_ERROR = 'user/update-error'
export const UPDATE_USER_SUCCESS = 'user/update-success'
export const LOGOUT = 'user/logout'
export const LOGOUT_SUCCESS = 'user/logout_success'
export const LOADING = 'user/loading'

const user = store => {
  store.on('@init', () => {
    if (defaultState.token && defaultState.userId) {
      store.dispatch('request', {
        resourceType: '$query',
        id: 'userinfo',
        params: {
          user: defaultState.userId
        },
        success: SET_USER,
        token: defaultState.token,
        spinner: LOADING,
        error: {
          env: SET_USER_TOKEN,
          params: { token: null, user: null }
        }
      })
    }
    return defaultState
  })
  store.on(LOADING, (s, userLoading) => {
    return { userLoading }
  })
  store.on(SET_USER_TOKEN, (s, { token, user }) => {
    if (token) {
      window.localStorage.setItem('token', token)
    } else {
      window.localStorage.removeItem('token')
    }
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user))
    } else {
      window.localStorage.removeItem('user')
    }
    return { token, user }
  })
  store.on(SET_TOKEN, (store, token) => {
    if (token) {
      window.localStorage.setItem('token', token)
    } else {
      window.localStorage.removeItem('token')
    }
    return { token }
  })
  store.on(SET_USER_ID, (store, userId) => {
    if (userId) {
      window.localStorage.setItem('userId', userId)
    } else {
      window.localStorage.removeItem('userId')
    }
    return { userId }
  })
  store.on(SET_USER, (s, user) => {
    const nu =
      user && user.data && user.data.length > 0 ? user.data[0].user : null

    return {
      userLoading: false,
      user: nu
    }
  })
  store.on(GET_CURRENT_USER, async s => {
    if (s.userId) {
      store.dispatch('request', {
        resourceType: '$query',
        id: 'userinfo',
        params: {
          user: s.userId
        },
        success: SET_USER,
        error: {
          env: SET_USER_TOKEN,
          params: { token: null, user: null }
        }
      })
    }
  })
  store.on(UPDATE_USER, (s, user) => {
    store.dispatch('request', {
      resourceType: 'UserProfile',
      id: s.userId,
      body: { ...user, id: s.userId },
      method: 'PUT',
      success: UPDATE_USER_SUCCESS,
      error: UPDATE_USER_ERROR
    })
  })
  store.on(UPDATE_USER_ERROR, (s, e) => {
    notification.error({ message: 'Ошибка обновления профиля' })
  })
  store.on(UPDATE_USER_SUCCESS, (s, user) => {
    store.dispatch(GET_CURRENT_USER)
    history.push('/user')
  })
  store.on(LOGOUT, async s => {
    store.dispatch('request', {
      resourceType: 'Session',
      method: 'DELETE',
      success: LOGOUT_SUCCESS,
      error: LOGOUT_SUCCESS
    })
  })
  store.on(LOGOUT_SUCCESS, () => {
    notification.success({ message: 'Вы вышли из системы' })
    store.dispatch(SET_USER_TOKEN, { token: null, user: null })
    store.dispatch(SET_USER_ID, null)
  })
}

export default user
