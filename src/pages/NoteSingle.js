import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import WordSlider from 'containers/WordSlider';
import NoteReview from 'containers/NoteReview';
// action creators
import { fetchWordsByNoteId } from 'store/modules/words';
import { checkWordKnown, checkWordUnknown } from 'store/modules/user';
// selectors
import { getWordsByNoteId, getWordsKnownByUser, getWordsUnknownByUser } from 'store/rootReducer';

class NoteSingle extends Component {
	componentWillMount() {
		const noteId = this.props.match.params.id;
		this.props.fetchWordsByNoteId(noteId);
	}

	render() {
		const { match, words, knownWords, unknownWords } = this.props;
		const noteId = match.params.id;
		const activeStyle = {
	        color: 'green',
	    };
		return (
			<div className="NoteSingle__root container">
				<Typography variant="headline" component="h1">NOTE { noteId }</Typography>
				<p>노트 정보 영역. getCurrentNote()로 노트정보 받아와서 뿌리기</p>
				<ul>
					<li>
						<NavLink to={`${match.url}/study`} activeStyle={activeStyle}>학습하기</NavLink>
					</li>
					<li>
						<NavLink to={`${match.url}/review`} activeStyle={activeStyle}>복습하기</NavLink>
					</li>
				</ul>
				<Route path={`${match.path}/study`} render={(props)=>(<WordSlider {...props} words={words}/>)}/>
				<Route path={`${match.path}/review`} render={(props)=>(<NoteReview {...props} words={unknownWords}/>)}/>
			</div>
		);
	}
}

const mapStateToProps = (state, {match}) => {
	return {
		words: getWordsByNoteId(state, match.params.id),
		knownWords: getWordsKnownByUser(state),
		unknownWords: getWordsUnknownByUser(state),
	};
}

export default connect(
	mapStateToProps, 
	{ fetchWordsByNoteId, checkWordKnown, checkWordUnknown }
)(NoteSingle);