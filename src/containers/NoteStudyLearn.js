import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { nextStep } from 'store/modules/user';
import SwipeableViews from 'react-swipeable-views';
import VoiceCardItem from 'components/VoiceCardItem';
import StudyDialog from 'components/StudyDialog';

class NoteStudyLearn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			started: false,
			completed: false,
			loop: 3,
			wordOnly: true,
		}
		this.handleChangeSwiperIndex = this._handleChangeSwiperIndex.bind(this);
	}

	_handleChangeSwiperIndex(index) {
		const isLastIndex = index === this.props.words.length;
		console.log(isLastIndex);
		if(!isLastIndex) {
			this.setState({
				activeIndex: index,
			});
		} else {
			if(this.state.wordOnly) {
				if(this.state.loop > 1){
					this.setState({
						activeIndex: 0,
						loop: this.state.loop-1,
					})
				} else {
					this.setState({
						activeIndex: 0,
						loop: 3,
						wordOnly: false,
						started: false,
					})
				}
			} else {
				if(this.state.loop > 1){
					this.setState({
						activeIndex: 0,
						loop: this.state.loop-1,
					})
				} else {
					this.props.nextStep(this.props.noteId);
					this.props.onComplete();
				}
			}
		}
	}

	render() {
		const { words, noteId, swiperStyles } = this.props;
		const { activeIndex, wordOnly, loop } = this.state;
		if(!this.state.started){
			if( words.length === 0 ){
				return (
					<StudyDialog
						open={!this.state.started}
						title={"모르는단어가 없습니다!"}
						messages={"지금부터 체크한 단어의 발음을 3번, 2번, 1번 차례대로 들려드립니다. 잘 듣고 암기해보세요!"}
						action={"다음스텝"}
						onConfirm={()=>
							{
								this.props.nextStep(this.props.noteId);
								this.props.onComplete();
							}
						}
					/>
				);
			} else {
				if(wordOnly){
					return (
						<StudyDialog
		          open={!this.state.started}
		          title={`모르는단어는 총 ${words.length}개 입니다.`}
		          messages={`지금부터 체크한 단어의 발음을 3번, 2번, 1번 차례대로 들려드립니다. 잘 듣고 암기해보세요!`}
		          onConfirm={()=>this.setState({started: true})}
		        />
					);
				} else {
					return (
						<StudyDialog 
      				open={!this.state.started}
      				title={`뜻과 함께 듣기`}
      				messages={`지금부터 체크한 단어의 발음과 뜻을 3번, 2번, 1번 차례대로 들려드립니다. 잘 듣고 암기해보세요!`}
      				onConfirm={()=>this.setState({started: true})}
      			/>
					);
				}
			}
    }
		return (
			<div>
				<SwipeableViews
					style={swiperStyles.root}
    			slideStyle={swiperStyles.slideContainer}
    			index={activeIndex}
    			onChangeIndex={this.handleChangeSwiperIndex}
    			resistance={true}
				>
					{
						words.map((word, idx) => (
							<VoiceCardItem
								key={word.id}
								{...word}
								wordOnly={wordOnly}
								loop={loop}
								active={idx===activeIndex}
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
	{ nextStep }
)(NoteStudyLearn);