import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import library from './FontAwesomeLibrary';
import logo from '../../assets/images/logo.svg';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem } from 'reactstrap';

class Header extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.closeNavbar = this.closeNavbar.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);

		this.state = {
			isOpen: false,
		};
	}
	componentWillMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	closeNavbar() {
		this.setState({
			isOpen: false
		});
	}
	handleClickOutside(event) {
		const t = event.target;
		if (this.state.isOpen && !t.classList.contains('navbar-toggler')) {
			this.closeNavbar();
		}
	}

	render() {
		return (
			<div className="topbar">
				<section className="container">
					<Navbar color="light" className="header" expand="md">
						<Link className="locoLink" to="/"><img src={logo} className="logo" alt="logo" /></Link>
						<Link to="/" className="logoCompany">Redux Blog</Link>
						<NavbarToggler onClick={this.toggle}>
							<FontAwesomeIcon icon={this.state.isOpen ? "times" : "bars"}/>
						</NavbarToggler>
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto routes" navbar>
								<NavItem>
									<Link to="/" onClick={this.closeNavbar}>Home</Link>
								</NavItem>
								<NavItem>
									<Link to="/articles" onClick={this.closeNavbar}>Articles</Link>
								</NavItem>
								<NavItem>
									<Link to="/articles/new" onClick={this.closeNavbar}>New Article</Link>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</section>
			</div>
		);
	}
}

export default Header;