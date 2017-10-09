export default function apiReducer(state={
    fetching: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_API": {
        return {
          ...state, 
          fetching: true
        }
      }
      case "FETCH_API_REJECTED": {
        return {
          ...state, 
          fetching: false, 
          error: action.payload
        }
      }
      case "FETCH_API_FULFILLED": {
        const endpoint = action.endpoint.split('/').pop();
        const fetchTimeout = new Date().getTime() + 15*60*1000;
        
        let apiRes = Object.assign({}, state.apiRes);
        let res = action.payload;
        if (action.payload.length === 1) {
          res = action.payload[0];
        }

        apiRes[endpoint] = {
          res,
          fetchTimeout
        };

        return {
          ...state,
          fetching: false,
          fetched: true,
          apiRes
        }
      }
      case 'RL_GET_DOC_FULFILLED': {
        return {
          ...state,
          RLFetching: false,
          RLFetched: true,
          RLData: action.payload.RLData
        };
      }
      default: {
        return state;
      }
    }
}
