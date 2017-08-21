import React, { Component } from 'react';

class Header extends Component {
	logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('token');
		window.location = '/login';
	}

	render() {

		return (
			<header>
				<div className="header-container">
					<img src="/static/logo.png" alt="" width="120px"/>
					<a href="#" style={{float: 'right'}} onClick={this.logout}>Salir</a>
				</div>
				<style jsx>{`
					.header-container {
						background: #fff;
						height: 60px;
						width: 100%;
						padding: 5px 40px;
						box-shadow: 0 0 5px rgba(0, 0, 0, .2)
					}
				`}</style>
			</header>
		)
	}
}

export default Header;
