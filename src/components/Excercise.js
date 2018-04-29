import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

import WordSlideItem from './WordSlideItem';

const styles = {
  root: {
    padding: '0 30px',
  },
  slideContainer: {
    padding: '0 10px',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
};

class Excercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			words: [
				{id: 1, spell: 'Prime', mean: '뜻1'},
				{id: 2, spell: 'Second', mean: '뜻2'},
				{id: 'xYzF', spell: 'Third', mean: '뜻3'},
				{id: 'ZZZF', spell: 'Fourth', mean: '뜻4'},
			]
		}
	}

	render() {
		
		const mapToWordCard = (words) => {
			return words.map((word, i) => {
				return(<WordSlideItem word={word} key={word.id}/>);
			});
		};

		return (
			<div className="Note__root">
				{ this.props.match.params.noteId }
				<SwipeableViews resistance={true} style={styles.root} slideStyle={styles.slideContainer}>
					{mapToWordCard(this.state.words)}
			    </SwipeableViews>
			</div>
		);
	}
}

export default Excercise;