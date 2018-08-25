import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import TextBookList from 'pages/TextBookList';

const createRoutes = ({history}) => {
	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={TextBookList} />
			</Switch>
		</ConnectedRouter>
	);
}

export default createRoutes;