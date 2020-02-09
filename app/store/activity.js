import { notification } from 'antd'
import history from '../history'

const defaultState = {
  activity: {
    filter: '',
    list: [],
    loading: false
  },
  activityInfo: {
    data: null,
    loading: false
  },
  activityFilter: {
    state: 'hidden',
    searchString: '',
    communityId: '',
    tags: []
  }
}

export const GET_LIST = 'activity/get-list'
export const SET_LIST = 'activity/set-list'
export const LOADING = 'activity/loading'
export const ERROR = 'activity/error'
export const LIKE = 'activity/like'
export const UPDATE_LIKE_SUCCESS = 'activity/update-like-success'
export const UNLIKE = 'activity/unlike'
export const UPDATE_UNLIKE_SUCCESS = 'activity/update-unlike-success'
export const CREATE = 'activity/create'
export const CREATE_SUCCESS = 'activity/create-success'
export const GET_BY_ID = 'activity/get-by-id'
export const GET_BY_ID_SUCCESS = 'activity/get-by-id-success'
export const GET_BY_ID_LOADING = 'activity/get-by-id-loading'
export const GET_BY_ID_RELOAD_BY_LU = 'activity/get-by-id-rblu'
export const UPDATE = 'activity/update'
export const UPDATE_SUCCESS = 'activity/update-success'
export const DISABLE = 'activity/disable'
export const DISABLE_SUCCESS = 'activity/disable-success'
export const SET_FILTER_TEXT = 'activity/set-filter-text'
export const SET_FILTER_TAG = 'activity/set-filter-tag'
export const SET_FILTER_COMMUNITY = 'activity/set-filter-community'
export const CLEAR_ACTIVITY_INFO = 'activity/clear-activity-info'
export const TOGGLE_ACTIVITY_FILTER = 'activity/toggle-activity-filter'

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
  store.on(LOADING, (state, loading) => {
    return { activity: { ...state.activity, loading } }
  })
  store.on(SET_LIST, (state, { data }) => {
    // TODO: make request to backend for return active activity
    const activeActivity = data.filter(
      ({ resource }) => typeof resource.active === 'undefined'
    )
    // TODO: make request to backend for return sorted activity
    const activityListByNewest = [...activeActivity].sort(
      ({ ts: ts1 }, { ts: ts2 }) => {
        const date1 = new Date(ts1)
        const date2 = new Date(ts2)
        if (date1 > date2) return -1
        if (date2 < date1) return 1
        return 0
      }
    )
    return {
      activity: { ...state.activity, list: activityListByNewest }
    }
  })
  store.on(ERROR, (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message })
    } else {
      notification.error({ message })
    }
  })
  store.on(LIKE, (s, params) => {
    let event = null
    let id = null
    if (typeof id !== 'string') {
      event = params.event
      id = params.id
    }
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
          id: id || params
        }
      },
      success: event || UPDATE_LIKE_SUCCESS,
      error: ERROR
    })
  })
  store.on(UPDATE_LIKE_SUCCESS, (s, data) => {
    notification.success({ message: 'Всё гуд, лайк записан' })
    return {
      activity: {
        ...s.activity,
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
  store.on(UNLIKE, (s, params) => {
    let event = null
    let id = null
    if (typeof id !== 'string') {
      event = params.event
      id = params.id
    }
    store.dispatch('request', {
      resourceType: 'ActivityLike',
      id: id || params,
      method: 'delete',
      success: event || UPDATE_UNLIKE_SUCCESS,
      error: ERROR
    })
  })
  store.on(UPDATE_UNLIKE_SUCCESS, (s, data) => {
    notification.success({ message: 'Всё гуд, лайк убрали' })
    return {
      activity: {
        ...s.activity,
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
    history.push(`/activity/${newCommunity.id}`)
  })
  store.on(GET_BY_ID, (s, id) => {
    store.dispatch('request', {
      resourceType: '$query',
      id: 'activityinfo',
      params: {
        id,
        user: s.userId
      },
      spinner: GET_BY_ID_LOADING,
      success: GET_BY_ID_SUCCESS,
      error: ERROR
    })
  })
  store.on(GET_BY_ID_LOADING, (s, loading) => {
    return { activityInfo: { ...s.activityInfo, loading } }
  })
  store.on(GET_BY_ID_RELOAD_BY_LU, (s, data) => {
    notification.success({ message: 'Всё гуд, с лайком разобрались!' })
    store.dispatch(GET_BY_ID, s.activityInfo.data.activity.id)
  })
  store.on(GET_BY_ID_SUCCESS, (s, { data }) => {
    const activity = data.find(v => v.resource_type === 'Activity')
    const likes = data
      .filter(v => v.resource_type === 'ActivityLike')
      .map(v => ({ ...v, ...v.resource.user }))
    return {
      activityInfo: {
        ...s.activityInfo,
        data: {
          activity: activity ? { ...activity, ...activity.resource } : null,
          likes
        }
      }
    }
  })

  store.on(UPDATE, (s, body) => {
    store.dispatch('request', {
      resourceType: 'Activity',
      id: body.id,
      body,
      method: 'PATCH',
      success: UPDATE_SUCCESS,
      error: ERROR,
      spinner: GET_BY_ID_LOADING
    })
  })

  store.on(DISABLE, (s, activity) => {
    store.dispatch('request', {
      resourceType: 'Activity',
      id: activity.id,
      body: activity,
      method: 'PATCH',
      success: DISABLE_SUCCESS,
      error: ERROR,
      spinner: LOADING
    })
  })

  store.on(SET_FILTER_TEXT, (state, searchString) => {
    return {
      activityFilter: {
        ...state.activityFilter,
        searchString
      }
    }
  })

  store.on(SET_FILTER_COMMUNITY, (state, communityId) => {
    return {
      activityFilter: {
        ...state.activityFilter,
        communityId:
          communityId === state.activityFilter.communityId ? '' : communityId
      }
    }
  })

  store.on(SET_FILTER_TAG, (state, tag) => {
    const {
      activityFilter: { tags }
    } = state
    if (tags.includes(tag)) {
      return {
        activityFilter: {
          ...state.activityFilter,
          tags: tags.filter(e => e !== tag)
        }
      }
    }

    return {
      activityFilter: {
        ...state.activityFilter,
        tags: [...tags, tag]
      }
    }
  })
  store.on(UPDATE_SUCCESS, (s, updated) => {
    history.push(`/activity/${updated.id}`)
  })
  store.on(DISABLE_SUCCESS, () => {
    history.push(`/activity`)
  })
  store.on(CLEAR_ACTIVITY_INFO, state => {
    return { activityInfo: { ...defaultState.activityInfo } }
  })
  store.on(TOGGLE_ACTIVITY_FILTER, state => {
    const {
      activityFilter: { state: stateFilter }
    } = state
    const newStateFilter = stateFilter === 'hidden' ? 'visible' : 'hidden'
    return {
      activityFilter: {
        ...state.activityFilter,
        state: newStateFilter
      }
    }
  })
}

export default activity
