import React, { Component } from 'react';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import ButtonBase from "material-ui/ButtonBase";
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan';
import VoicePlayer from './VoicePlayer';

class VoiceCardItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isComplete: false,
		}
	}

	shouldComponentUpdate(prevProps, prevState) {
		return (prevState !== this.state || prevProps.active !== this.props.active);
	}

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
				voices.push(<VoicePlayer play text={word} onEnd={this.onEnd}/>);
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
								gutterBottom>
								{word}
							</Typography>
							{ !wordOnly && 
								<Typography
									align="center"
									variant="subheading"
									component="h3">
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
		minHeight: "50vh"
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