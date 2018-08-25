import React, { Component } from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import lightBlue from '@material-ui/core/colors/lightBlue';
import SpellCheck from '@material-ui/icons/Spellcheck';
import Hearing from '@material-ui/icons/Hearing';
import Send from '@material-ui/icons/Send';

class SplashCarousel extends Component {

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
						    label='프라임워드 시작하기'
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
						      title='프라임워드는 쉽습니다'
						      subtitle='쉽고, 빠르고, 특별한 영단어 암기를 경험해보세요!'
						    />
						    <Slide
						      media={<Hearing style={{ fontSize: 96, color: '#fff' }}/>}
						      mediaBackgroundStyle={{ backgroundColor: lightBlue[500] }}
						      style={{ backgroundColor: lightBlue[600] }}
						      title='프라임워드는 빠릅니다'
						      subtitle='발음과 뜻을 반복해서 들으면 단어를 빠르게 흡수할 수 있어요!'
						    />
						    <Slide
						      media={<Send style={{ fontSize: 96, color: '#fff' }}/>}
						      mediaBackgroundStyle={{ backgroundColor: lightBlue[600] }}
						      style={{ backgroundColor: lightBlue[700] }}
						      title='프라임워드는 특별합니다'
						      subtitle='프라임워드만의 특허기술로 단어를 쉽게 외워보세요!'
						    />
						  </AutoRotatingCarousel>
            </div>
        );
    }
}

export default SplashCarousel;
