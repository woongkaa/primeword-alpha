import React, { Component } from 'react';
import { 
	ListItem, 
	ListItemText, 
} from "material-ui/List";
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MicIcon from 'material-ui-icons/Mic';

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
				<Avatar>adv</Avatar>
				<ListItemText 
					primary={`단어 ${word}`}
					secondary={`뜻 ${meaning}`}
				/>
				<IconButton color="primary" aria-label="Text to Voice" onClick={this.handleVoiceButtonClick}>
					<MicIcon />
				</IconButton>
			</ListItem>
		);
	}
}

export default WordListItem;