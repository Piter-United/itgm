import React from 'react'
import { mount, shallow } from 'enzyme'
import StoreContext from 'storeon/react/context'
import createStore from 'storeon'
import { MemoryRouter, Redirect } from 'react-router-dom'

import user, { SET_TOKEN, LOADING } from '../../app/store/user'
import Comp from 'components/PrivateRoute'

describe('<PrivateRouter />', () => {
  it('without token', () => {
    const store = createStore([user])
    const comp = mount(
      <MemoryRouter>
        <StoreContext.Provider value={store}>
          <Comp component={<div>Help</div>} />
        </StoreContext.Provider>
      </MemoryRouter>
    )
    expect(comp.find(Comp).html()).toEqual(
      '<div>Access Denied<br><a href="/login">Login</a></div>'
    )
  })
  it('with token / userLoading true', () => {
    const store = createStore([user])
    store.dispatch(SET_TOKEN, { token: 'token' })
    const comp = mount(
      <MemoryRouter>
        <StoreContext.Provider value={store}>
          <Comp component={<div>Help</div>} />
        </StoreContext.Provider>
      </MemoryRouter>
    )
    expect(comp.find(Comp).isEmptyRender()).toEqual(true)
  })

  it('with token / userLoading false / user = null', () => {
    const store = createStore([user])
    store.dispatch(SET_TOKEN, { token: 'token' })
    store.dispatch(LOADING, false)
    const comp = mount(
      <MemoryRouter>
        <StoreContext.Provider value={store}>
          <Comp component={<div>Help</div>} />
        </StoreContext.Provider>
      </MemoryRouter>
    )
    expect(comp.find(Redirect).isEmpty()).toEqual(false)
  })
})
