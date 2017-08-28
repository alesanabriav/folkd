import React, { Component } from 'react';
import request from 'axios';

class Header extends Component {
	logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('folk-token');
		window.location = '/login';
	}

	getDriveUrl = (e) => {
		e.preventDefault();
		const state = encodeURIComponent(JSON.stringify({id: 3}));
		request
		.post('/gaoauth-url', state)
		.then(res => window.location = res.data.url);
	}

	render() {
		return (
			<header>
				<div className="header-container">
					<a href="/" class="navbar-brand"><img src="/static/logo.png" alt="" width="120px"/></a>
					<a href="#" onClick={this.getDriveUrl}>drive</a>
					<a href="#" className="header-container__logout" onClick={this.logout}>
						<i className="ion-log-out"></i> Salir
					</a>
				</div>
				<style jsx>{`
					.header-container {
						background: #fff;
						height: 60px;
						width: 100%;
						padding: 5px 40px;
						box-shadow: 0 0 5px rgba(0, 0, 0, .2)
					}

					.header-container__logout {
						float: right;
						margin-top: 10px;
						color: #333;
					}
				`}</style>
			</header>
		)
	}
}

export default Header;
