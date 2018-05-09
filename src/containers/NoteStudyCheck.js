import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateKnown, updateUnknown, nextStep } from 'store/modules/user';
import { getWordsByNoteId } from 'store/rootReducer';
import SwipeableViews from 'react-swipeable-views';
import WordSlideItem from 'components/WordSlideItem';
import StudyDialog from 'components/StudyDialog';

class NoteStudyCheck extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
      started: false,
		}
		this.handleChangeSwiperIndex = this._handleChangeSwiperIndex.bind(this);
	}

	_handleChangeSwiperIndex(index) {
		// const isLastIndex = index === this.props.words.length;
    const isLastIndex = index === 5;
		if(!isLastIndex) {
			this.setState({
				activeIndex: index,
			});
		} else {
			this.props.onComplete();
		}
	}
	shouldComponentUpdate(prevProps, prevState) {
		const hasSliderChanged = prevState.activeIndex !== this.state.activeIndex;
    const hasStarted = prevState.started !== this.state.started;
		return hasSliderChanged || hasStarted;
	}

  render() {
      const { words, noteId, swiperStyles } = this.props;
      const { activeIndex } = this.state;
      if(!this.state.started){
        return (
          <StudyDialog
            open={!this.state.started}
            title={"단어체크를 시작합니다"}
            messages={`지금부터 ${words.length}개 단어를 체크합니다. 아는단어를 클릭해주세요.`}
            onConfirm={()=>this.setState({started: true})}
          />
        )
      }
      return (
      	<div>
      		<SwipeableViews
      			disabled={true}
      			style={swiperStyles.root}
      			slideStyle={swiperStyles.slideContainer}
      			index={activeIndex}
      			onChangeIndex={this.handleChangeSwiperIndex}
      			resistance={true}
      		>
      			{
      				words.map((word, idx) => (
      					<WordSlideItem 
      						key={word.id}
      						{...word}
      						active={idx===activeIndex}
      						onSuccess={()=>this.props.updateKnown(noteId, word.id)}
									onFail={()=>this.props.updateUnknown(noteId, word.id)}
									onComplete={()=>this.handleChangeSwiperIndex(idx+1)}
      					/>
    					))
      			}	
      		</SwipeableViews>
      	</div>
      )
  }
}

export default connect(
    null,
    { updateKnown, updateUnknown, nextStep }
)(NoteStudyCheck);
