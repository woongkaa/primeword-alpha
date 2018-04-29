import React from 'react';
import { Link } from 'react-router-dom';


const Home = (props) => {
	return(
		<div className="Home__root container">
			<ul>
				<li><Link to="/notes">단어장페이지로 이동</Link></li>
			</ul>
		</div>
	);
}

export default Home;