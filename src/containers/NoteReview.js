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
		const { words, currentStep } = this.props;
		const isLastStep = currentStep === 2;
	
		const renderList = words.length < 1 ? (
			<div>복습할 단어가 없습니다.</div>
		) : (
			<List>
				<ListSubheader>모르는 단어 듣기학습</ListSubheader>
				{ words.map((word, index) => (
					<WordListItem {...word} key={index}
					/>))
				}
			</List>
		)

		return (
			<div className="NoteReview__root">
				{ renderList }		
				<div className="Button__wrapper">
					{ currentStep === 3 ? (
						<div>
							단어장 학습을 마쳤습니다.
						</div>
					) : (
						<Button
							variant="raised"
							color="primary"
							onClick={this.handleNextClick}
							className="">
							{ isLastStep ? 'FINISH THIS NOTE' : 'NEXT STEP'}
						</Button>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, {noteId}) => {
	return {
		words: getWordsUnknownByNoteId(state, noteId)
	};
}

export default connect(mapStateToProps, { nextStep })(NoteReview);
