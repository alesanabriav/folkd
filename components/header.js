import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotifications } from '../actions/notifications';
import Popper from 'popper.js';
import Link from 'next/link';

class Header extends Component {
	state = {
		showNotifications: false
	}

	logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('folk-token');
		window.location = '/login';
	}

	componentDidMount() {
		this.props.getNotifications(this.props.variables);
	}

	toggleNotifications = (e) => {
		e.preventDefault();
		this.setState({showNotifications: !this.state.showNotifications});
	}

	render() {
		const { user, notifications } = this.props;
		const { showNotifications } = this.state;

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
					      <button className="btn btn-warning" onClick={this.toggleNotifications}>
									<i className={showNotifications ? "ion-android-notifications-none" : "ion-android-notifications"}></i>
								</button>
								<div className={ showNotifications ? "notifications notifications--show" : "notifications"}>
									<ul>
										{notifications.map(notification =>
											<li>
												<Link href={notification.url}><a>{notification.message}</a></Link>
												<span>
													<button className="btn btn-sm"><i className="ion-close"></i></button>
												</span>
											</li>
										)}
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
						right: 15px;
						top: 56px;
						box-shadow: 0 2px 10px rgba(0,0,0,.2);
					}

					.notifications--show {
						display: block;
					}

					.notifications ul li {
						display: flex;
						min-height: 30px;
						width: 100%;
						background: #f1f1f1;
						margin-bottom: 2px;
						padding: 10px;
					}

					.notifications ul li a {
						color: #333;
						display: block;
						width: 80%;
					}
				`}</style>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.users.current,
		notifications: state.notifications.items,
		variables: state.notifications.variables
	}
}

const mapDispatchToProps = {
	getNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
