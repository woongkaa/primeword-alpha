import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from 'material-ui-icons/CheckCircle';

import SwipeableViews from 'react-swipeable-views';

// Need Split
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const Home = (props) => {
	return(
		<div className="Home__root container">
			<ul>
				<li><Link to="/notes">단어장페이지로 이동</Link></li>
			</ul>
		</div>
	);
}

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


const styles = theme => ({
	root: {
		paddingTop: '36px',
		width: '100%',
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	tabsRoot: {
		position: 'absolute',
		zIndex: '1100',
		top: 56,
		left: 0,
		right: 0,
	},
	tabLabel: {
		fontSize: '1.125em',
	},
	container: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		display: 'flex',
		color: theme.palette.text.primary,
		minHeight: '100px',
	},
	title: {
		alignSelf: 'flex-end',
	},
	checkIcon: {
		marginLeft: 'auto',
		height: 32,
		width: 32,
	}
});

class TextBookList extends Component {
	state = {
		value: 0,
	};

	handleTabChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static" className={classes.tabsRoot}>
					<Tabs 
						value={value} 
						onChange={this.handleTabChange} 
						centered 
						fullWidth 
						indicatorColor="secondary">
						<Tab 
							classes={{
								label: classes.tabLabel
							}} 
							label="내신" />
						<Tab 
							classes={{
								label: classes.tabLabel
							}} 
							label="수능" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					index = {this.state.value}
					onChangeIndex = {this.handleChangeIndex}
				>
					<TabContainer>
						<div className={classes.container}>
							<Grid container spacing={16}>
								<Grid item xs={12} sm={4}>
									<Paper className={classes.paper}>
										<Typography variant="headline" className={classes.title}>
											동아
										</Typography>
										<IconButton className={classes.checkIcon}>
											<CheckCircle />
										</IconButton>
									</Paper>
								</Grid>
								<Grid item xs={12} sm={4}>
										<Paper className={classes.paper}>
											<Typography variant="headline" className={classes.title}>
												동아
											</Typography>
											<IconButton className={classes.checkIcon}>
												<CheckCircle />
											</IconButton>
										</Paper>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Paper className={classes.paper}>
										<Typography variant="headline" className={classes.title}>
											동아
										</Typography>
										<IconButton className={classes.checkIcon}>
											<CheckCircle />
										</IconButton>
									</Paper>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Paper className={classes.paper}>
										<Typography variant="headline" className={classes.title}>
											동아
										</Typography>
										<IconButton className={classes.checkIcon}>
											<CheckCircle />
										</IconButton>
									</Paper>
								</Grid>
							</Grid>
						</div>
					</TabContainer>
					<TabContainer>
						<div className={classes.container}>
							<Grid container spacing={16}>
								<Grid item xs={12} sm={4}>
									<Link to="/notes">
										<Paper className={classes.paper}>
											<Typography variant="headline" className={classes.title}>
												2015 수능기초 700
											</Typography>
											<IconButton className={classes.checkIcon}>
												<CheckCircle />
											</IconButton>
										</Paper>
									</Link>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Paper className={classes.paper}>
										<Typography variant="headline" className={classes.title}>
											2016 수능
										</Typography>
										<IconButton className={classes.checkIcon}>
											<CheckCircle />
										</IconButton>
									</Paper>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Paper className={classes.paper}>
										<Typography variant="headline" className={classes.title}>
											2017 수능
										</Typography>
										<IconButton className={classes.checkIcon}>
											<CheckCircle />
										</IconButton>
									</Paper>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Paper className={classes.paper}>
										<Typography variant="headline" className={classes.title}>
											2018 3월 모의
										</Typography>
										<IconButton className={classes.checkIcon}>
											<CheckCircle />
										</IconButton>
									</Paper>
								</Grid>
							</Grid>
						</div>
					</TabContainer>
				</SwipeableViews>
			</div>
		);
	}
}

export default withStyles(styles)(TextBookList);