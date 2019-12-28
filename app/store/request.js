import { site_url } from '../config'

const toQuery = params => {
  let p = []
  Object.keys(params).forEach(key => {
    p.push(`${key}=${params[key]}`)
  })
  return p.join('&')
}

const request = store => {
  store.on('request', async (s, request) => {
    const {
      resourceType,
      id,
      success,
      error,
      params,
      spinner,
      method = 'GET',
      body = null
    } = request
    if (spinner) {
      store.dispatch(spinner, true)
    }
    const dispatchErr = params => {
      if (error) {
        if (typeof error === 'string') {
          store.dispatch(error, params)
        } else {
          store.dispatch(error.env, { ...params, ...error.params })
        }
        if (spinner) {
          store.dispatch(spinner, false)
        }
      }
    }
    try {
      const options = {
        method,
        headers: {
          'content-type': 'application/json'
        }
      }
      if (body) {
        options.body = JSON.stringify(body)
      }
      if (request.token) {
        options.headers.Authorization = `Bearer ${request.token}`
      } else if (s.token) {
        options.headers.Authorization = `Bearer ${s.token}`
      }
      const res = await fetch(
        `${site_url}/${resourceType}${id ? `/${id}` : ''}${
          params ? `?${toQuery(params)}` : ''
        }`,
        options
      )
      const data = await res.json()
      if (res.status >= 200 && res.status < 400) {
        if (success) {
          store.dispatch(success, data)
        }
        if (spinner) {
          store.dispatch(spinner, false)
        }
      } else {
        dispatchErr({ res, data, message: 'request failed' })
      }
    } catch (err) {
      dispatchErr({ message: err })
    }
  })
}

export default request
