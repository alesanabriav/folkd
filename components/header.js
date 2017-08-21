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
						height: 80px;
						width: 100%;
						padding: 10px 40px;
						box-shadow: 0 0 5px rgba(0,0,0,.1)
					}
				`}</style>
			</header>
		)
	}
}

export default Header;
