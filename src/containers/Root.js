import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { withStyles } from '@material-ui/core/styles';

import HeaderContainer from './HeaderContainer';
import TextBookList from 'pages/TextBookList';
import NoteSingle from 'pages/NoteSingle';
import NoteList from 'pages/NoteList';

import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1, 
		padding: theme.spacing.unit * 2,
		minHeight: '100vh',
	},
});

const Root = ({store, history, classes}) => {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#1A237E',
			},
			secondary: {
				main: '#1890FF',
			},
			background: {
				default: '#fafafa',
			},
		},
	});
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<div className={classes.root}>
						<HeaderContainer />
						<main className={classes.content}>
							<div className={classes.toolbar} />
							<Route exact path="/" component={TextBookList}/>
							<Route path="/notes" component={NoteList}/>
							<Route path="/note/:id" component={NoteSingle}/>
						</main>
					</div>
				</MuiThemeProvider>
			</ConnectedRouter>
		</Provider>
	);
};

Root.propTypes = {
	store: PropTypes.object.isRequired,
}

export default withStyles(styles)(Root);