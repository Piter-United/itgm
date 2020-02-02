import createStore from 'storeon'

import user from './user'
import request from './request'
import community from './community'
import activity from './activity'
import map from './map'

const store = createStore([
  request,
  user,
  community,
  activity,
  map,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools')
])

export default store
