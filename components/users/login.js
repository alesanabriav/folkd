import React from 'react';
import request from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	state =  {
		email: '',
		password: ''
	}

	handleChange = (field, e) => {
		let val = e.currentTarget.value;
		this.setState({...this.state, [field]: val});
	}

	login = (e) => {
		e.preventDefault();

		request.post('/login', this.state).then(({data}) => {
				if(data.token) {
					console.log(data);
					localStorage.setItem('folk-token', data.token);
					setTimeout(() => {
						window.location = '/';
					})
				}
		});
	}

	render() {
		return (
			<div className="row login">
			<div className="col-lg-4 col-md-6 login__container">
					<form>
						<div className="input-group">
							<input type="text" placeholder="email" className="form-control" onChange={this.handleChange.bind(null, 'email')}/>
						</div>

						<div className="input-group" style={{marginTop: "20px"}}>
							<input type="password" placeholder="password" className="form-control" onChange={this.handleChange.bind(null, 'password')}/>
						</div>
						<div className="row" style={{marginTop: "20px"}}>
						<div className="input-group col-lg-6 col-sm-6 col-xs-6">
							<button
								className="btn"
								style={{
									float: "left"
								}}
								onClick={this.login}
							>
								Login
							</button>
						</div>
						<div className="input-group col-lg-6 col-sm-6 col-xs-6">
							<a className="btn" href="/register" >I am new</a>
						</div>
						</div>
					</form>
				</div>
				<style jsx>{`
					.login {
						height: calc(100vh - 60px);
					}

					.login__container {
						background: rgba(0,0,0,.5);
						padding: 40px;
						box-shadow: 0 10px 5px rgba(0,0,0,.5)
					}

					.btn {
						float: right;
						cursor: pointer;
						color: #fff;
						border: 1px solid rgba(255, 255, 255, .7);
						background: rgba(0,0,0,.5);
						width: 100%;
					}
				`}</style>
			</div>
		)
	}
}

export default Login;
