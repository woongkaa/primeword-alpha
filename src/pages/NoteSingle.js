import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import { fetchWordsByNoteId } from 'store/modules/words';
import { fetchSingleNote } from 'store/modules/notes';
import { getWordsByNoteId, getWordsUnknownByNoteId, getCurrentStep } from 'store/rootReducer';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import HearingIcon from 'material-ui-icons/Hearing';
import CheckIcon from 'material-ui-icons/Spellcheck';
import InfoIcon from 'material-ui-icons/InfoOutline';

import NoteStudy from 'containers/NoteStudy';
import NoteReview from 'containers/NoteReview';
import StepperBox from 'components/StepperBox';


const styles = theme => ({
	root: {},
	content: {},
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);'
	},
});

class NoteSingle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mode: "info"
		}
	}

	componentWillMount() {
		const noteId = this.props.match.params.id;
		this.props.fetchWordsByNoteId(noteId);
		this.props.fetchSingleNote(noteId);
	}

	handleChange = (event, value) => {
		this.setState({
			mode: value
		});
	};

	renderContent = (mode) => {
		const { match, words, currentStep } = this.props;
		const noteId = match.params.id;
		switch (mode) {
			case "info":
				return (
					<div>노트기본정보</div>
				);
			case "check":
				return (
					<NoteStudy noteId={noteId} words={words} currentStep={currentStep}/>
				);
			case "listen":
				return (
					<NoteReview noteId={noteId} currentStep={currentStep}/>
				);
			default:
				return (
					<div>노트기본정보</div>
				);
		}
	}

	render() {
		const { match, words, currentStep, classes } = this.props;
		const { mode } = this.state;
		const isComplete = currentStep > 2 ? true : false;
		const noteId = match.params.id;
		const content = mode === "check" ? (
			<NoteStudy noteId={noteId} words={words} currentStep={currentStep}/>
		) : (
			<NoteReview noteId={noteId} currentStep={currentStep}/>
		);
		return (
			<div className={classes.root}>
				<Typography variant="headline" component="h1">NOTE {noteId}</Typography>
				<StepperBox currentStep={currentStep} />
				<div className={classes.content}>
					{ this.renderContent(mode) }
				</div>
				<BottomNavigation
					value={mode}
					onChange={this.handleChange}
					showLabels
					className={classes.bottomNav}>
					<BottomNavigationAction label="노트정보" value="info" icon={<InfoIcon />} />
					<BottomNavigationAction label="체크하기" value="check" icon={<CheckIcon />} />
					<BottomNavigationAction label="듣기" value="listen" icon={<HearingIcon />} />
				</BottomNavigation>
			</div>
		);
	}
}

const mapStateToProps = (state, {match}) => {
	return {
		words: getWordsByNoteId(state, match.params.id),
		currentStep: getCurrentStep(state, match.params.id)
	};
}

export default connect(
	mapStateToProps, 
	{ fetchWordsByNoteId, fetchSingleNote }
)(withStyles(styles)(NoteSingle));