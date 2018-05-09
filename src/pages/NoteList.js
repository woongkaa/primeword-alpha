import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateAppBarTitle } from 'store/modules/ui';

import NoteListContainer from 'containers/NoteListContainer';

class NoteList extends Component {

	componentWillMount() {
		this.props.updateAppBarTitle('단어장 리스트');
	}
	
	render() {
		return (
			<div>
				<NoteListContainer />
			</div>
		);
	}
}

export default connect(null, { updateAppBarTitle })(NoteList);