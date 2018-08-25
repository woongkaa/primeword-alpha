import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';

class WordListItem extends Component {
	constructor(props) {
		super(props);
		this.handleVoiceButtonClick = this._handleVoiceButtonClick.bind(this);
	}

	_handleVoiceButtonClick(e) {
		e.stopPropagation();
		this.utter = new SpeechSynthesisUtterance();
		this.utter.text = this.props.word;
		this.utter.lang = 'en-US';
		speechSynthesis.speak(this.utter);
	}

	render() {
		const { word, meaning } = this.props;
		return(
			<ListItem button>
				<ListItemText 
					// primary={`단어 ${word}`}
					primary={word}
					// secondary={`뜻 ${meaning}`}
					secondary={meaning}
				/>
				<IconButton color="primary" aria-label="Text to Voice" onClick={this.handleVoiceButtonClick}>
					<MicIcon />
				</IconButton>
			</ListItem>
		);
	}
}

export default WordListItem;