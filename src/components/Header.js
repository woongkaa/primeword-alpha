import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	appBar: {
		position: 'absolute',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
});

class Header extends Component {
	render() {
		const { classes, title } = this.props;
		return (
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="title" color="inherit">
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(Header);