import React, { Component } from 'react';
import { connect } from 'react-redux';
//import action creators
import { updateKnown, updateUnknown } from 'store/modules/user';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import WordSlideItem from 'components/WordSlideItem';

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
			activeIndex: 0,
		}
		this.handleChangeSwiperIndex = this._handleChangeSwiperIndex.bind(this);

	}

	componentWillMount() {
	}

	componentDidUpdate(prevProps, prevState) {
	}

	_handleChangeSwiperIndex(index) {
		const isLastIndex = index === 4;
		if(!isLastIndex) {
			this.setState({
				activeIndex: index,
			});
		}
	}
	
	render() {
		const { words, noteId, classes, currentStep } = this.props;
		const { activeIndex } = this.state;
		const sliceIndex = currentStep * 10 + 30;
		return (
			<div className={classes.root}>
				<SwipeableViews 
					style={swiperStyles.root}
					slideStyle={swiperStyles.slideContainer}
					index={activeIndex} 
					onChangeIndex={this.handleChangeSwiperIndex} 
					resistance={true}>
					{
						words.slice(0,sliceIndex).map((word, idx)=> (
							<WordSlideItem 
								key={idx}
								{...word}
								active={idx===activeIndex}
								onSuccess={()=>{this.props.updateKnown(noteId, word.id)}}
								onFail={()=>{
									this.props.updateUnknown(noteId, word.id)}}
								onComplete={()=>this.handleChangeSwiperIndex(idx+1)}
							/>))
					}
				</SwipeableViews>
			</div>
		);
	}
}

export default connect(
	null, 
	{ updateKnown, updateUnknown }
)(withStyles(styles)(NoteStudy));