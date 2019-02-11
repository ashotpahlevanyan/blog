import React from 'react';
import { Button } from 'reactstrap';

const Home = (props) => {
	return (
		<section className="home">
				<h1 className="display-3">Hello, Welcome to our Blog!</h1>
				<p className="lead">We are specialised in writing High Quality Articles on various technologies.</p>
				<hr className="my-2" />
				<p>We use Latest trends in Article Writing</p>
				<p className="lead">
					<Button color="primary">Check Articles</Button>
				</p>
		</section>
	);
};

export default Home;
