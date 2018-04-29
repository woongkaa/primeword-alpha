import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {
//     action as actionAction,
// } from 'path';
import Header from 'components/Header';

export class HeaderContainer extends Component {
    render() {
        return (
        	<Header />
        );
    }
}

const mapStateToProps = (state) => ({
	pathName: state.routing
})

export default connect(mapStateToProps)(HeaderContainer);

