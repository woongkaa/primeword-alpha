import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';

import HeaderContainer from './HeaderContainer';
import Home from 'pages/Home';
import NoteSingle from 'pages/NoteSingle';
import NoteList from 'pages/NoteList';

const Root = ({store, history}) => {
	const theme = createMuiTheme({
		palette: {
			primary: teal,
		},
	});
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MuiThemeProvider theme={theme}>
					<div>
						<HeaderContainer />
						<div style={{ paddingTop: '4em'}}>
							<Route exact path="/" component={Home}/>
							<Route path="/notes" component={NoteList}/>
							<Route path="/note/:id" component={NoteSingle}/>
						</div>
					</div>
				</MuiThemeProvider>
			</ConnectedRouter>
		</Provider>
	);
};

Root.propTypes = {
	store: PropTypes.object.isRequired,
}

export default Root;