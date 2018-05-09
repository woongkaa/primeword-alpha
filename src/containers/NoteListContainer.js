import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchNotes } from 'store/modules/notes';
import { getAllNotes } from 'store/rootReducer';

import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import AssignmentIcon from 'material-ui-icons/Assignment';
// import ActionTrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import { teal300 } from 'material-ui/colors';

class NoteListContainer extends Component {

	componentWillMount() {
		this.props.fetchNotes();
	}

	render() {
		const { notes } = this.props;
		return (
			<List>
				<ListSubheader component="div">교과서명</ListSubheader>
				{ notes.map((note, index) => {
					return(
						<Link to={`/note/${note.id}`} key={note.id}>
							<ListItem button>
								<Avatar>
									<AssignmentIcon/>
								</Avatar>
								<ListItemText 
									primary={`단어장 <${note.lesson}>`}
									secondary={`기타정보 ex. 진행율/성적`}/>
							</ListItem>
						</Link>
					);
				})}
			</List>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notes: getAllNotes(state),
	};
}

export default connect(mapStateToProps, { fetchNotes })(NoteListContainer);