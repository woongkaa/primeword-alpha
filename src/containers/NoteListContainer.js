import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchNotes } from 'store/modules/notes';
import { getAllNotes } from 'store/rootReducer';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import ListSubheader from 'material-ui/List/ListSubheader';
// import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AssignmentIcon from 'material-ui-icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Avatar from '@material-ui/core/Avatar';
import Done from '@material-ui/icons/Done';

const style = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		display: 'flex',
		color: theme.palette.text.primary,
		minHeight: '100px',
	},
	title: {
		alignSelf: 'flex-end',
	},
	progressIcon: {
		marginLeft: 'auto',
		color: '#fff',
		height: 24,
		width: 24,
	},
	progressOngoing: {
		backgroundColor: lightBlue[200],
	},
	progressDone: {
		backgroundColor: lightBlue[500],
	},
});

class NoteListContainer extends Component {

	componentWillMount() {
		this.props.fetchNotes();
	}

	render() {
		const { notes, classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={16}>
					{ notes.map((note, index) => {
						let iconClasses = {
							root: classes.progressIcon,
						};
						if (index % 3 === 1) {
							iconClasses = {
								...iconClasses,
								colorDefault: classes.progressOngoing,
							}
						} else if (index % 3 === 2) {
							iconClasses = {
								...iconClasses,
								colorDefault: classes.progressDone,
							}
						}
						return(
							<Grid item xs={12}>
								<Link to={`/note/${note.id}`} key={note.id}>
										<Paper className={classes.paper} elevation={1}>
											<Typography variant="headline" className={classes.title}>
												{note.lesson}
											</Typography>
											<Avatar classes={iconClasses}>
												<Done />
											</Avatar>
										</Paper>
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notes: getAllNotes(state),
	};
}

export default connect(mapStateToProps, { fetchNotes })(withStyles(style)(NoteListContainer));