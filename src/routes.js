import React from 'react';
import { Route, IndexRoute } from 'react-router';
//import App from './App';
import AppConnect from './AppConnect';

import SignupPage from './components/signup/SignupPage';
import FFballPage from './components/ffball/FFballPage';
import Layout from './components/Layout';
import ProjectPage from './components/project/ProjectPage';
import Single from './components/reduxstagram/Single';
import PhotoGrid from './components/reduxstagram/PhotoGrid';
import RocketLeaguePage from './components/rocketLeague/RocketLeaguePage';
import ApiJiraPage from './components/apiJiraAutomation/ApiJiraPage';

export default (
	<Route path='/' component={AppConnect}>
		<IndexRoute component={Layout} />
		<Route path='signup' component={SignupPage} />
		<Route path='ffball' component={FFballPage} />
		<Route path='rocketLeague' component={RocketLeaguePage} />
		<Route path='projectTest' component={ProjectPage} />
		<Route path='/photos/view/:postId' component={Single} />
		<Route path='/photos/grid' component={PhotoGrid} />
		<Route path='/jira' component={ApiJiraPage} />
	</Route>
)