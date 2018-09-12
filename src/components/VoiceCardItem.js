import React, { Component } from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import VoicePlayer from './VoicePlayer';

class VoiceCardItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isComplete: false,
		}
	}

	// shouldComponentUpdate(prevProps, prevState) {
	// 	const hasLoopChanged = prevProps.loop !== this.props.loop;
	// 	const hasActivated = (prevProps.active !== this.props.active) && this.props.active;
	// 	return (prevState !== this.state || hasLoopChanged || hasActivated);
	// }

	onEnd = () => {
		this.setState({
			isComplete: true,
		});
		setTimeout(()=>this.props.onComplete(), 500);
	}

	render() {
		const { word, meaning, classes, wordOnly, loop } = this.props;
		const cardClassname = classNames({
			[classes.card]: true,
			[classes.cardComplete]: this.state.isComplete,
		})
		var voices = [];
		for (var i = 0; i < loop; i++) {
			if(i===loop-1){
				voices.push(<VoicePlayer play text={word} onEnd={this.onEnd} key={i}/>);
				break;
			}
			voices.push(<VoicePlayer play text={word} key={i}/>);
		}
		return (
			<div className={classes.root}>
				<Card className={cardClassname}>
					<CardContent>
							<Typography
								align="center"
								variant="headline"
								component="h2"
								gutterBottom
								style={{fontSize: '4rem'}}>
								{word}
							</Typography>
							{ !wordOnly && 
								<Typography
									align="center"
									variant="subheading"
									component="h3"
									style={{fontSize: '2rem'}}>
									{this.props.meaning}
								</Typography>
							}
							{ this.props.active && (
								<div>
									{voices}
								</div>
							)}
					</CardContent>
				</Card>
			</div>
		);
	}
}

const styles = (theme) => ({
	root: {
		width: "100%",
	},
	card: {
		width: "100%",
		minHeight: "50vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	cardComplete: {
		background: cyan[400],
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

export default withStyles(styles)(VoiceCardItem);