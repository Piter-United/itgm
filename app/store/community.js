import { notification } from 'antd'

import history from '../history'

const defaultState = {
  community: {
    list: [],
    loading: false
  },
  communityInfo: {
    loading: false,
    data: null
  }
}

export const GET_LIST = 'community/get-list'
export const SET_LIST = 'community/set-list'
export const LOADING = 'community/loading'
export const ERROR = 'community/error'
export const CREATE = 'community/create'
export const CREATE_SUCCESS = 'community/create-success'
export const CREATE_ERROR = 'community/create-error'
export const GET_BY_ID = 'community/get-by-id'
export const GET_BY_ID_SUCCESS = 'community/get-by-id-success'
export const GET_BY_ID_LOADING = 'community/get-by-id-loading'
export const GET_BY_ID_RELOAD_BY_LU = 'community/get-by-id-rblu'

const community = store => {
  store.on('@init', () => defaultState)
  store.on(GET_LIST, () => {
    store.dispatch('request', {
      resourceType: 'Community',
      success: SET_LIST,
      error: ERROR,
      spinner: LOADING
    })
  })
  store.on(LOADING, (s, loading) => {
    return { community: { ...s.community, loading } }
  })
  store.on(SET_LIST, (s, data) => {
    return {
      community: { ...s.community, list: data.entry.map(v => v.resource) }
    }
  })
  store.on(ERROR, (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message })
    } else {
      notification.error({ message })
    }
  })
  store.on(CREATE, (s, body) => {
    store.dispatch('request', {
      resourceType: 'Community',
      method: 'post',
      body: {
        ...body,
        owner: {
          resourceType: 'User',
          id: s?.user?.id
        }
      },
      success: CREATE_SUCCESS,
      error: CREATE_ERROR
    })
  })
  store.on(CREATE_SUCCESS, (s, data) => {
    console.log(data)
    notification.success({ message: 'Всё гуд, сообщество создано' })
    history.push(`/community/${data.id}`)
  })
  store.on(CREATE_ERROR, (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message })
    } else {
      notification.error({ message })
    }
  })
  store.on(GET_BY_ID, (s, id) => {
    store.dispatch('request', {
      resourceType: '$query',
      id: 'community',
      params: {
        id,
        user: s?.user?.id
      },
      spinner: GET_BY_ID_LOADING,
      success: GET_BY_ID_SUCCESS,
      error: ERROR
    })
  })
  store.on(GET_BY_ID_LOADING, (s, loading) => {
    return { communityInfo: { ...s.communityInfo, loading } }
  })
  store.on(GET_BY_ID_RELOAD_BY_LU, (s, data) => {
    notification.success({ message: 'Всё гуд, с лайком разобрались!' })
    store.dispatch(GET_BY_ID, s.communityInfo.data.community.id)
  })
  store.on(GET_BY_ID_SUCCESS, (s, { data }) => {
    const community = data.find(v => v.resource_type === 'Community')
    const participants = data
      .filter(v => v.resource_type === 'UserProfile')
      .map(v => ({ ...v.resource }))
    const activity = data
      .filter(v => v.resource_type === 'Activity')
      .map(v => ({ ...v, ...v.resource }))
    activity.sort((a, b) => b.likes.count - a.likes.count)
    return {
      communityInfo: {
        ...s.communityInfo,
        data: {
          community: community ? { ...community, ...community.resource } : null,
          activity,
          participants
        }
      }
    }
  })
}

export default community
