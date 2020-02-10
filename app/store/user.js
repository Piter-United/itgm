import { notification } from 'antd'
import history from '../history'

const defaultState = {
  token: window.localStorage.getItem('token') || null,
  userLoading: true,
  user: null
}
export const SET_USER = 'user/set-user'
export const SET_TOKEN = 'user/set-token'
export const GET_CURRENT_USER = 'user/get-current-user'
export const UPDATE_USER = 'user/update'
export const UPDATE_USER_ERROR = 'user/update-error'
export const UPDATE_USER_SUCCESS = 'user/update-success'
export const LOGOUT = 'user/logout'
export const LOGOUT_SUCCESS = 'user/logout_success'
export const LOADING = 'user/loading'
export const LOGIN = 'user/login'
export const LOGIN_SUCCESS = 'user/login_success'
export const LOGIN_ERROR = 'user/login_error'

const user = store => {
  store.on('@init', () => {
    if (defaultState.token) {
      store.dispatch('request', {
        resourceType: 'auth',
        id: 'validate',
        success: SET_USER,
        token: defaultState.token,
        spinner: LOADING,
        error: {
          env: SET_TOKEN,
          params: { token: null }
        }
      })
    } else {
      defaultState.token = null
    }
    return defaultState
  })
  store.on(LOADING, (s, userLoading) => {
    return { userLoading }
  })
  store.on(SET_TOKEN, (store, { token }) => {
    if (token) {
      window.localStorage.setItem('token', token)
    } else {
      window.localStorage.removeItem('token')
    }
    return { token }
  })
  store.on(SET_USER, (s, user) => {
    if (!user || (user && !user.community)) {
      history.push('/user/edit')
    }
    return {
      userLoading: false,
      user: user
    }
  })
  store.on(GET_CURRENT_USER, async ({ token }) => {
    if (token) {
      store.dispatch('request', {
        resourceType: 'auth',
        id: 'validate',
        success: SET_USER,
        error: {
          env: SET_TOKEN,
          params: { token: null }
        }
      })
    }
  })
  store.on(UPDATE_USER, (s, user) => {
    store.dispatch('request', {
      resourceType: 'UserProfile',
      id: s.user.id,
      body: { ...user, id: s.user.id },
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
    store.dispatch(SET_TOKEN, { token: null })
    store.dispatch(SET_USER, null)
    history.push('/')
  })
  store.on(LOGIN, (s, user) => {
    store.dispatch('request', {
      resourceType: 'auth',
      id: 'token',
      body: { client_id: 'password-auth', grant_type: 'password', ...user },
      method: 'POST',
      success: LOGIN_SUCCESS,
      error: LOGIN_ERROR
    })
  })
  store.on(LOGIN_ERROR, (s, e) => {
    console.log(e)
    if (e.data && e.data.error && e.data.error === 'invalid_grant') {
      notification.error({ message: 'Введен неверный e-mail или пароль' })
    } else {
      notification.error({ message: 'Ошибка авторизации' })
    }
  })
  store.on(LOGIN_SUCCESS, (s, user) => {
    store.dispatch(SET_TOKEN, { token: user.access_token })
    history.push('/')
  })
}

export default user
