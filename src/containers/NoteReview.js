import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListSubheader from 'material-ui/List/ListSubheader';
import List from 'material-ui/List';
import Button from 'material-ui/Button';
import WordListItem from 'components/WordListItem';

import { nextStep } from 'store/modules/user';
import { getWordsUnknownByNoteId } from 'store/rootReducer';

class NoteReview extends Component {
	constructor(props) {
		super(props);
		this.handleNextClick = this._handleNextClick.bind(this);
	}

	_handleNextClick(e) {
		this.props.nextStep(this.props.noteId);
	}

	render() {
		const { unknownWords, currentStep } = this.props;
		const isLastStep = currentStep === 2;
	
		const renderList = unknownWords.length < 1 ? (
			<div>복습할 단어가 없습니다.</div>
		) : (
			<List>
				<ListSubheader>모르는 단어 듣기학습</ListSubheader>
				{ unknownWords.map((word, index) => (
					<WordListItem {...word} key={index}
					/>))
				}
			</List>
		)

		return (
			<div>
				{ renderList }
			</div>
		);
	}
}

const mapStateToProps = (state, { id }) => {
	return {
		unknownWords: getWordsUnknownByNoteId(state, id)
	};
}

export default connect(mapStateToProps, { nextStep })(NoteReview);
