import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainLayout from './MainLayout';

import { connect } from 'react-redux';
import { fetchNotes } from 'store/modules/word';
import NoteList from './NoteList';
import Excercise from './Excercise';

class App extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount() {
		this.props.fetchNotes();
	}

	render () {
		// this.props.fetchNotes();
		console.log(this.props.allNotes);
		return (
			<div>
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<MainLayout>
					<PublicRoutes />
				</MainLayout>
			</MuiThemeProvider>
			</div>
		);
	}
}

const PublicRoutes = props => (
	<Switch>
		<Route exact path="/" component={NoteList}/>
		<Route path="/study/:note_id" component={Excercise}/>
	</Switch>
);

const mapStateToProps = (state, ownProps) => {
	const { notes, routing: { location } } = state;
	return {
		allNotes: notes,
		pathname: location.pathname
	};
}

export default connect(mapStateToProps, { fetchNotes })(App);