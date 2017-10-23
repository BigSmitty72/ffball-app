import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import store, { history } from './store';

require('dotenv').config({ silent: true });

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
  document.getElementById('root')
);
