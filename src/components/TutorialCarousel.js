import React, { Component } from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import lightBlue from '@material-ui/core/colors/lightBlue';
import SpellCheck from '@material-ui/icons/Spellcheck';
import Hearing from '@material-ui/icons/Hearing';
import Send from '@material-ui/icons/Send';

class TutorialCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	open: true,
        }
    }

    render() {
        return (
            <div>
            	<AutoRotatingCarousel
						    label='학습 시작하기'
						    open={this.state.open}
						    onStart={() => this.setState({open: false})}
						    onClose={() => this.setState({open: false})}
						    mobile
						    style={{ position: 'absolute' }}
						  >
						    <Slide
						      media={<SpellCheck style={{ fontSize: 96, color: '#fff' }}/>}
						      mediaBackgroundStyle={{ backgroundColor: lightBlue[400] }}
						      style={{ backgroundColor: lightBlue[500] }}
						      title='먼저 아는 단어를 체크합니다'
						      subtitle='아는 단어가 나오면 단어를 터치해주세요!'
						    />
						    <Slide
						      media={<Hearing style={{ fontSize: 96, color: '#fff' }}/>}
						      mediaBackgroundStyle={{ backgroundColor: lightBlue[500] }}
						      style={{ backgroundColor: lightBlue[600] }}
						      title='모르는 단어를 들으며 암기합니다'
						      subtitle='먼저 발음을 들어보고, 뜯과 같이 들으며 단어를 암기해보세요!'
						    />
						    <Slide
						      media={<Send style={{ fontSize: 96, color: '#fff' }}/>}
						      mediaBackgroundStyle={{ backgroundColor: lightBlue[600] }}
						      style={{ backgroundColor: lightBlue[700] }}
						      title='마치고 나면'
						      subtitle='학습한 단어들을 복습할 수 있습니다. 이제 시작해볼까요?'
						    />
						  </AutoRotatingCarousel>
            </div>
        );
    }
}

export default TutorialCarousel;
