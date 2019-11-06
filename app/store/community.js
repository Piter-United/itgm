import { notification } from 'antd';

const defaultState = {
  community: {
    list: [],
    loading: false
  }
};

const community = store => {
  store.on('@init', () => {
    return defaultState;
  });
  store.on('community/get-list', () => {
    store.dispatch('request', {
      resourceType: 'Community',
      success: 'community/set-list',
      error: 'community/error',
      spinner: 'community/loading'
    });
  });
  store.on('community/loading', (s, loading) => {
    return { community: { ...s.community, loading } };
  });
  store.on('community/set-list', (s, data) => {
    return {
      community: { ...s.community, list: data.entry.map(v => v.resource) }
    };
  });
  store.on('community/error', (s, { data, message }) => {
    if (data && data.message) {
      notification.error({ message: data.message });
    } else {
      notification.error({ message });
    }
  });
};

export default community;
