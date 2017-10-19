import axios from 'axios';

export function fetchApi(method, endpoint, payload, config) {
  if (method === 'GET') {
    return function(dispatch) {
      axios.get(endpoint).then((response) => {
        dispatch({
          type: 'FETCH_API_FULFILLED',
          endpoint: endpoint,
          payload: response.data
        })
      }).catch((err) => {
        dispatch({
          type: 'FETCH_API_REJECTED',
          payload: err
        })
      })
    }
  } else if (method === 'POST') {
    axios.defaults.headers.common['X-FFBall-ProxyVersion'] = '1';
    return function(dispatch) {
      axios.post(endpoint, payload, config).then((response) => {
        dispatch({
          type: 'FETCH_API_FULFILLED',
          endpoint: endpoint,
          payload: response.data
        })
      }).catch((err) => {
        dispatch({
          type: 'FETCH_API_REJECTED',
          payload: err
        })
      })
    }
  }
}

export function rocketLeaguePriceIndex(endpoint, googlePayload, config, consoleName) {
  return function(dispatch) {
    axios.post(endpoint, googlePayload, config).then((response) => {
      dispatch({
        type: 'RL_GET_DOC_FULFILLED',
        endpoint: endpoint,
        payload: response.data,
        consoleName: consoleName
      })
    }).catch((err) => {
      dispatch({
        type: 'FETCH_API_REJECTED',
        payload: err
      })
    })
  }
}
