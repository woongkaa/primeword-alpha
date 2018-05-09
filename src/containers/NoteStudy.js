import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWordsByNoteId, getWordsUnknownByNoteId } from 'store/rootReducer';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import NoteStudyCheck from 'containers/NoteStudyCheck';
import NoteStudyLearn from 'containers/NoteStudyLearn';
import StepperBox from 'components/StepperBox';
import StudyDialog from 'components/StudyDialog';

const styles = theme => ({
	root: {
		maxWidth: '90vw',
	},
});

const swiperStyles = {
	root: {
		padding: '0 16px',
	},
	slideContainer: {
		padding: '8px',
	},
}

class NoteStudy extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stepStarted: false,
			hasChecked: false,
			hasLearned: false,
		}
	}

	componentWillMount() {
	}

	/*shouldComponentUpdate(prevProps, prevState) {
		const hasModeChanged = prevState.mode !== this.state.mode;
		const hasStepChanged = prevProps.currentStep !== this.props.currentStep;
		const hasStepStarted = prevState.stepStarted !== this.state.stepStarted;
		return hasModeChanged || hasStepChanged || hasStepStarted;
	}*/
	render() {
		const { words, id, classes, currentStep, unknownWords } = this.props;
		const { hasChecked, hasLearned } = this.state;
		const count = currentStep * 10 + 30;
		if(currentStep === 3) {
			return (
				<div className={classes.root}>
					<StudyDialog
						open={true}
						title={"완료"}
						messages={"학습을 마쳤습니다."}
						action={"돌아가기"}
						onConfirm={()=>this.props.onComplete()}
					/>
				</div>
			);
		}
		return (
			<div className={classes.root}>
				<StepperBox currentStep={currentStep} />
				{ !hasChecked ? (
					<NoteStudyCheck 
						noteId={id}
						swiperStyles={swiperStyles}
						words={words.slice(0, count)}
						onComplete={()=>this.setState({hasChecked: true})}
					/>
				) : (
					<NoteStudyLearn
						noteId={id}
						swiperStyles={swiperStyles}
						words={unknownWords}
						onComplete={()=>this.setState({hasChecked: false})}
					/>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state, { id }) => {
	return {
		words: getWordsByNoteId(state, id),
		unknownWords: getWordsUnknownByNoteId(state, id),
	};
}
export default connect(
	mapStateToProps,
	null
)(withStyles(styles)(NoteStudy));