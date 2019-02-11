import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Navbar,
	Nav,
	NavItem } from 'reactstrap';

class Footer extends Component {
	render() {
		return(
			<footer className="footer">
				<section className="container">
					<Navbar>
						<Nav className="routes" navbar>
							<NavItem>
								<Link to="/">Articles</Link>
							</NavItem>
							<NavItem>
								<Link to="/articles/new">New Article</Link>
							</NavItem>
						</Nav>
					</Navbar>
				</section>
			</footer>
		);
	}
}

export default Footer;