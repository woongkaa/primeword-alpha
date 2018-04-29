import React, { Component } from 'react';
import ListSubheader from 'material-ui/List/ListSubheader';
import List from 'material-ui/List';
import WordListItem from 'components/WordListItem';

class NoteReview extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		const { words } = this.props;
		
		if(words.length < 1){
			return(
				<div>
					단어가 없습니다
				</div>
			);
		}

		return (
			<div className="NoteReview__root">
				{
					<List>
						<ListSubheader>체크한 단어 복습</ListSubheader>
						{ words.map((word, index) => (
							<WordListItem {...word} key={index}
							/>))
						}
					</List>
				}
			</div>
		);
	}
}

export default NoteReview;
