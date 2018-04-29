import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Home from 'pages/Home';

const createRoutes = ({history}) => {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</ConnectedRouter>
	);
}

export default createRoutes;