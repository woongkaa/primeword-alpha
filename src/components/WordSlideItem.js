import React, { Component } from 'react';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import ButtonBase from "material-ui/ButtonBase";
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan';
import pink from 'material-ui/colors/pink';

class WordSlideItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: props.word,
			isComplete: false,
			isKnown: false,
		}
		this.handleCardClick = this._handleCardClick.bind(this);
		this.handleTimer = this._handleTimer.bind(this);
	}

	shouldComponentUpdate(prevProps, prevState) {
		return (prevState !== this.state || prevProps.active !== this.props.active);
	}

	componentDidMount() {
		if(this.props.active) {
			this.handleTimer();
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if( this.props.active && prevProps.active !== this.props.active){
			this.handleTimer();
			// console.log('card index changed', prevProps);
		}
	}

	_handleTimer() {
		this.timer = setTimeout(()=>{
			this.setState({
				isComplete: true,
				// isKnown: false,
			});
			this.props.onFail();
			setTimeout(this.props.onComplete, 1000);
		}, 1500);
	}

	_handleCardClick(e) {
		clearTimeout(this.timer);
		this.setState({
			isComplete: true,
			isKnown: true,
		});
		this.props.onSuccess();
		setTimeout(this.props.onComplete, 1000);
	}

	render() {
		const { word,	meaning, classes } = this.props;
		const cardClassname = classNames({
			[classes.card]: true,
			[classes.cardSuccess]: this.state.isComplete && this.state.isKnown,
			[classes.cardFail]: this.state.isComplete && !this.state.isKnown,
		});
		const renderMeaning = (isComplete) => {
			if(isComplete)
				return (
					<Typography variant="subheading" component="h3">{this.props.meaning}</Typography>
				);
			else
				return;
		}
		return (
			<ButtonBase 
				focusRipple  
				onClick={this.handleCardClick}>
				<Card className={cardClassname}>
					<CardContent>
						<span className={classes.wordText}>
							<Typography variant="headline" component="h2" gutterBottom>
								{word}
							</Typography>
							{renderMeaning(this.state.isComplete)}
						</span>
						<span className={classes.wordText}>
						</span>
					</CardContent>
				</Card>
			</ButtonBase>
		);
	}
}

const styles = (theme) => ({
	card: {
		minWidth: "75vw",
		minHeight: "50vh"
	},
	cardSuccess: {
		background: cyan[400],
	},
	cardFail: {
		background: pink[400],
	},
	wordText: {
		left: 0, right: 0, top: 0, bottom: 0,
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pos: {
		marginBottom: 12,
	},
});

export default withStyles(styles)(WordSlideItem);