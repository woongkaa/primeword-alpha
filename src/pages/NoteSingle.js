import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchWordsByNoteId } from 'store/modules/words';
import { fetchSingleNote } from 'store/modules/notes';
import { updateAppBarTitle } from 'store/modules/ui';
import { getUserNoteById, getCurrentStep } from 'store/rootReducer';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoteNavigation from '@material-ui/core/BottomNavigation';
import NoteNavigationAction from '@material-ui/core/BottomNavigationAction'
import HearingIcon from '@material-ui/icons/Hearing';
import CheckIcon from '@material-ui/icons/Spellcheck';
import InfoIcon from '@material-ui/icons/InfoOutline';

import NoteStudy from 'containers/NoteStudy';
import NoteReview from 'containers/NoteReview';
import StepperBox from 'components/StepperBox';
import Spinner from 'components/Spinner';
import TutorialCarousel from 'components/TutorialCarousel';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import lightBlue from '@material-ui/core/colors/lightBlue';

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
		// boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);'
	},
	noteNavSelected: {
		color: theme.palette.secondary.main,
	},
	spinnerRoot: {
		left: 0, right: 0, top: 0, bottom: 0,
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}, 
	cardContent: {
		minHeight: '360px',
	},
	cardTitle: {
		fontSize: 20,
	},
	cardAvatar: {
		background: lightBlue[500],
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
		if(this.props.note) {
			this.props.updateAppBarTitle(this.props.note.lesson);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.note) {
			this.props.updateAppBarTitle(nextProps.note.lesson);
		}
	}

	handleChange = (event, value) => {
		this.setState({
			view: value
		});
	};

	renderContent = (view) => {
		const { match, note, words, currentStep, classes } = this.props;
		switch (view) {
			case "info":
				return (
					<div>
						<Card>
							<CardHeader 
								avatar={
									<Avatar aria-label="노트 카테고리" className={classes.cardAvatar}>
										수능
									</Avatar>
								}
								title={
									this.props.note.lesson
								}
								classes={{
									title: classes.cardTitle,
								}}
							/>
							<CardContent className={classes.cardContent}>
								<Typography variant="headline" component="h2" style={{marginBottom: 16,}}>
									이 노트에 대한 정보
								</Typography>
								<Typography component="p">
									노트에 대한 정보를 기술합니다.
								</Typography>
								<Typography component="p">
									노트를 업로드하신 강사님의 코멘트, 학습 기한 등이 추가될 수 있습니다.
								</Typography>
							</CardContent>
							<CardActions>
								<Button 
									variant="raised" 
									color="secondary" 
									size="large" 
									fullWidth={true}
									onClick={()=>{this.setState({view: "study"})}}
									>
									학습 시작하기
								</Button>
							</CardActions>
						</Card>
					</div>
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
				<TutorialCarousel />
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
						classes={{
							selected: classes.noteNavSelected,
						}} 
					/>
					<NoteNavigationAction
						label="체크&학습"
						value="study"
						icon={<CheckIcon />} 
						classes={{
							selected: classes.noteNavSelected,
						}}
					/>
					<NoteNavigationAction
						label="복습"
						value="review"
						icon={<HearingIcon />} 
						classes={{
							selected: classes.noteNavSelected,
						}}
					/>
				</NoteNavigation>
				{ view === "info" && (
					<Card style={{marginBottom: 24}}>
						<CardHeader 
							title="학습현황"
							className={classes.cardTitle} 
						/>
						<StepperBox currentStep={currentStep} />
					</Card>
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