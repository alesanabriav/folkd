import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'axios';
import Popper from 'popper.js';
import Link from 'next/link';

class Header extends Component {
	logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('folk-token');
		window.location = '/login';
	}

	componentDidMount() {

	}

	render() {
		const { user } = this.props;

		return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					  <Link href="/"><a className="navbar-brand" >Folkders</a></Link>
					  <button className="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>

					  <div className="collapse navbar-collapse" id="navbarSupportedContent">
							{user.hasOwnProperty('id') ?
					    <ul className="navbar-nav mr-auto">
					      <li className="nav-item active">
					        <Link href="/">
										<a className="nav-link">Profile {user.name} <span className="sr-only">(current)</span></a>
									</Link>
					      </li>
					      <li className="nav-item">
									<Link href="/">
					        	<a className="nav-link" href="#">Team</a>
									</Link>
					      </li>
								<li className="nav-item">
					        <a className="nav-link" onClick={this.logout} href="#">cerrar</a>
					      </li>
					    </ul>
							: ''}
							<span class="navbar-text notifications-container">
					      <button className="btn btn-warning"><i className="ion-android-notifications"></i></button>
								<div className="notifications">
									<ul>
										<li>localStorage message 1</li>
										<li>localStorage message 2</li>
										<li>localStorage message 3</li>
									</ul>

								</div>
					    </span>
					  </div>
					</nav>
				<style jsx>{`
					.header-container {
						display: flex;
						background: #fff;
						height: 60px;
						width: 100%;
						padding: 5px 40px;
						box-shadow: 0 0 5px rgba(0, 0, 0, .2)
					}

					.header-brand {
						float: left;
					}

					.header-container ul {
						float: left;
					}

					.header-container__logout {
						float: right;
						margin-top: 10px;
						color: #333;
					}

					.notifications-container {
						position: relative;
					}

					.notifications {
						display: none;
						background: #fff;
						width: 300px;
						height: 300px;
						overflow: auto;
						position: absolute;
						z-index: 99;
						right: 0;
					}
				`}</style>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.current
	}
}

export default connect(mapStateToProps)(Header);
