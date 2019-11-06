const u = window.localStorage.getItem('user');

const defaultState = {
  token: window.localStorage.getItem('token') || null,
  user: u ? JSON.parse(u) : null
};

const user = store => {
  store.on('@init', () => {
    if (defaultState.token && defaultState.user) {
      store.dispatch('request', {
        resourceType: 'User',
        id: defaultState.user.id,
        success: 'user/set-user',
        error: {
          env: 'user/set-user-token',
          params: { token: null, user: null }
        }
      });
    }
    return defaultState;
  });
  store.on('user/set-user-token', (store, { token, user }) => {
    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      window.localStorage.removeItem('token');
    }
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('user');
    }
    return { token, user };
  });
  store.on('user/set-token', (store, token) => {
    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      window.localStorage.removeItem('token');
    }
    return { token };
  });
  store.on('user/set-user', (store, user) => {
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('user');
    }
    return { user };
  });
  store.on('user/get-current-user', async s => {
    if (s.user && s.user.id) {
      store.dispatch('request', {
        resourceType: 'User',
        id: s.user.id,
        success: 'user/set-user',
        error: {
          env: 'user/set-user-token',
          params: { token: null, user: null }
        }
      });
    }
  });
};

export default user;
