// import { applyMiddleware, createStore, compose } from "redux";
import { applyMiddleware, createStore } from "redux";
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from './reducers/index';
import comments from './components/data/comments';
import posts from './components/data/posts';

const middleware = applyMiddleware(promise(), thunk, logger())


//create an object for the default data
const initialState = {
	api: {
		apiRes: []
	},
	posts: posts,
	comments: comments,
	user: {
	    isAuthenticated: true,
	    userName: "BigSmitty72",
	    email: "jasonsmith7272@gmail.com",
	    userId: 9999,
	    firstName: "Jason",
	    lastName: "Smith"
	}
	// projects: [],
	// powerRankings: [],
	// currentApi: '',
	// apiRes: []
};

// Connect store
// const enhancers = compose (
// 	window.devToolsExtension ? window.devToolsExtension() : f => f
// );
//

const store = createStore(
	rootReducer,
	initialState,
	//enhancers,
	middleware
);

export const history = syncHistoryWithStore(
	browserHistory, 
	store
);

export default store;