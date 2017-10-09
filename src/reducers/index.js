import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import apiReducer from './apiReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	api: apiReducer,
	posts: postsReducer,
	comments: commentsReducer,
	routing: routerReducer,
	user: userReducer
});

export default rootReducer;