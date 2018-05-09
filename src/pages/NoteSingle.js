import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWordsByNoteId } from 'store/modules/words';
import { fetchSingleNote } from 'store/modules/notes';
import { updateAppBarTitle } from 'store/modules/ui';
import { getUserNoteById, getCurrentStep } from 'store/rootReducer';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import NoteNavigation, { BottomNavigationAction as NoteNavigationAction } from 'material-ui/BottomNavigation';
import HearingIcon from 'material-ui-icons/Hearing';
import CheckIcon from 'material-ui-icons/Spellcheck';
import InfoIcon from 'material-ui-icons/InfoOutline';

import NoteStudy from 'containers/NoteStudy';
import NoteReview from 'containers/NoteReview';
import StepperBox from 'components/StepperBox';
import Spinner from 'components/Spinner';


const styles = theme => ({
	root: {
		width: '100%',
	},
	content: {
		width: '100%',
	},
	toolbar: {
		...theme.mixins.toolbar,
	},
	noteNav: {
		position: 'absolute',
		zIndex: '1100',
		top: 56,
		left: 0,
		right: 0,
		boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);'
	},
	spinnerRoot: {
		left: 0, right: 0, top: 0, bottom: 0,
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
});

class NoteSingle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: "info"
		}
	}

	componentWillMount() {
		const noteId = this.props.match.params.id;
		this.props.fetchSingleNote(noteId);
		this.props.fetchWordsByNoteId(noteId);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.note!==null) {
			this.props.updateAppBarTitle(nextProps.note.lesson);
		}
	}

	handleChange = (event, value) => {
		this.setState({
			view: value
		});
	};

	renderContent = (view) => {
		const { match, note, words, currentStep } = this.props;
		switch (view) {
			case "info":
				return (
					<div>노트기본정보</div>
				);
			case "study":
				return (
					<NoteStudy
						{...note}
						noteId={note.id}
						words={words}
						currentStep={currentStep}
						onComplete={()=>this.setState({view: "info"})}
					/>
				);
			case "review":
				return (
					<NoteReview
						{...note}
						noteId={note.id}
						currentStep={currentStep}/>
				);
			default:
				return (
					<div>노트기본정보</div>
				);
		}
	}

	render() {
		const { match, note, currentStep, classes } = this.props;
		const { view } = this.state;
		const isComplete = currentStep > 2 ? true : false;

		if(!note) {
			return (
				<div className={classes.spinnerRoot}>
					<Spinner />
				</div>
			);
		}

		return (
			<div className={classes.root}>
				<div className={classes.toolbar}></div>
				<NoteNavigation
					value={view}
					onChange={this.handleChange}
					showLabels
					className={classes.noteNav}>
					<NoteNavigationAction
						label="노트정보"
						value="info"
						icon={<InfoIcon />} 
					/>
					<NoteNavigationAction
						label="체크&학습"
						value="study"
						icon={<CheckIcon />} 
					/>
					<NoteNavigationAction
						label="복습"
						value="review"
						icon={<HearingIcon />} 
					/>
				</NoteNavigation>
				{ view === "info" && (
					<div>
						<Typography
							variant="title"
							component="h2">
							학습현황
						</Typography>
						<StepperBox currentStep={currentStep} />
					</div>
				)}
				<div className={classes.content}>
					{ this.renderContent(view) }
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, {match}) => {
	const noteId = match.params.id;
	return {
		note: getUserNoteById(state, noteId),
		currentStep: getCurrentStep(state, noteId)
	};
}

export default connect(
	mapStateToProps, 
	{ fetchWordsByNoteId, fetchSingleNote, updateAppBarTitle }
)(withStyles(styles)(NoteSingle));