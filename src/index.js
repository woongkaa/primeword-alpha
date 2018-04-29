import React from 'react';
import ReactDOM from 'react-dom';
import configureStore, { history } from './store/configureStore';
import Root from './containers/Root';

import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

ReactDOM.render(
	<Root store={store} history={history}/>, 
	document.getElementById('root')
);

registerServiceWorker();
