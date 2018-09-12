import React, { Component } from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';

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
			setTimeout(this.props.onComplete, 2000);
		}, 2000);
	}

	_handleCardClick(e) {
		clearTimeout(this.timer);
		if( !this.state.isKnown ){
			this.setState({
				isComplete: true,
				isKnown: true,
			});
			this.props.onSuccess();
		} else {
			this.setState({
				isKnown: false,
			});
			this.props.onFail();
		}
		setTimeout(this.props.onComplete, 2000);
	}

	render() {
		const { word,	meaning, classes } = this.props;
		const cardClassname = classNames({
			[classes.card]: true,
			[classes.cardSuccess]: this.state.isComplete && this.state.isKnown,
			[classes.cardFail]: this.state.isComplete && !this.state.isKnown,
		});
		return (
			<div className={classes.root}>
				<ButtonBase 
					focusRipple  
					onClick={this.handleCardClick}
					disabled={this.state.isComplete&&!this.state.isKnown}
					className={classes.cardWrapper}>
					<Card className={cardClassname}>
						<CardContent>
								<Typography variant="headline" component="h2" gutterBottom style={{fontSize: '4rem'}}>
									{word}
								</Typography>
								{ this.state.isComplete && (
									<Typography variant="subheading" component="h3" style={{fontSize: '2rem'}}>{this.props.meaning}</Typography>
								)}
						</CardContent>
					</Card>
				</ButtonBase>
			</div>
		);
	}
}

const styles = (theme) => ({
	cardWrapper: {
		width: "100%",
	},
	card: {
		width: "100%",
		minHeight: "50vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
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