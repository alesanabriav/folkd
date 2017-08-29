import React, { Component } from 'react';
import request from 'axios';
import Link from 'next/link';

class Header extends Component {
	logout = (e) => {
		e.preventDefault();
		localStorage.removeItem('folk-token');
		window.location = '/login';
	}

	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					  <Link href="/"><a className="navbar-brand" >Folkders</a></Link>
					  <button className="navbar-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>

					  <div className="collapse navbar-collapse" id="navbarSupportedContent">
					    <ul className="navbar-nav mr-auto">
					      <li className="nav-item active">
					        <Link href="/">
										<a className="nav-link">Profile <span className="sr-only">(current)</span></a>
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
				`}</style>
			</header>
		)
	}
}

export default Header;
