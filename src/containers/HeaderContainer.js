import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppBarTitle } from 'store/rootReducer';
import Header from 'components/Header';

export class HeaderContainer extends Component {
	renderTitle = () => {
		const pathname = this.props.routing.location.pathname;
		return pathname;
	}

  render() {
  	const { title } = this.props;

    return (
    	<Header title={title}/>
    );
  }
}

const mapStateToProps = (state) => ({
	title: getAppBarTitle(state),
})

export default connect(mapStateToProps)(HeaderContainer);

