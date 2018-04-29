import React, { Component } from 'react';
import { connect } from 'react-redux';

//import action creators
import { checkWordKnown, checkWordUnknown } from 'store/modules/user';
//import selectors
// import { getWordsByNoteId, getWordsKnownByUser, getWordsUnknownByUser } from 'store/rootReducer';

import SwipeableViews from 'react-swipeable-views';
import WordSlideItem from 'components/WordSlideItem';

const styles = {
  root: {
    padding: '0 30px',
  },
  slideContainer: {
    padding: '10px 10px',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
};

class WordSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			phase: 1,
			wordsUnChekced: [],
			activeIndex: 0,
		}
		this.handleChangeSwiperIndex = this._handleChangeSwiperIndex.bind(this);

	}

	componentWillMount() {
	}

	componentDidUpdate(prevProps, prevState) {
	}

	_handleChangeSwiperIndex(index) {
		this.setState({
			activeIndex: index,
		});
	}
	
	render() {
		const { words } = this.props;
		const { activeIndex } = this.state;
		return (
			<div className="WordSlider__root container">
				<SwipeableViews 
					index={activeIndex} 
					onChangeIndex={this.handleChangeSwiperIndex} 
					resistance={true} style={styles.root} 
					slideStyle={styles.slideContainer}>
					{
						words.slice(0,10).map((word, idx)=> (
							<WordSlideItem 
								key={idx}
								{...word}
								active={idx===activeIndex}
								onSuccess={()=>{this.props.checkWordKnown(word.id)}}
								onFail={()=>{this.props.checkWordUnknown(word.id)}}
								onComplete={()=>this.handleChangeSwiperIndex(idx+1)}
							/>))
					}
				</SwipeableViews>
			</div>
		);
	}
}

// export default WordSlider;
// const mapStateToProps = (state, {match}) => {
// 	return {
// 		words: getWordsByNoteId(state, match.params.id),
// 		knownWords: getWordsKnownByUser(state),
// 		unknownWords: getWordsUnknownByUser(state),
// 	};
// }

export default connect(
	null, 
	{ checkWordKnown, checkWordUnknown }
)(WordSlider);