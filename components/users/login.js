import React from 'react';
import request from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	handleChange(field, e) {
		let val = e.currentTarget.value;
		this.setState({...this.state, [field]: val});
	}

	login(e) {
		e.preventDefault();
		console.log(this.state);
		request.post('/login', this.state).then(({data}) => {
				if(data.success) {
					localStorage.setItem('token', data.token);
					window.location = '/home';
				}
		});
	}

	render() {
		return (
			<div className="row" style={{ height: '90vh' }}>
			<div className="col-lg-3" style={{ background: '#19212F', padding: "40px" }}>
					<form>
						<div className="input-group">
							<input type="text" placeholder="email" className="form-control" onChange={this.handleChange.bind(null, 'email')}/>
						</div>

						<div className="input-group" style={{marginTop: "20px"}}>
							<input type="password" placeholder="password" className="form-control" onChange={this.handleChange.bind(null, 'password')}/>
						</div>
						<div className="row" style={{marginTop: "20px"}}>
						<div className="input-group col-lg-6">
							<button
								className="btn"
								style={{ 
									float: "right", 
									cursor: "pointer", 
									color: "#fff",
									border: "1px solid #9CC0FA", 
									background: 'rgba(0,0,0,.5)',
									width: '100%'
								}}
								onClick={this.login}
							>
								Login
							</button>
						</div>
						<div className="input-group col-lg-6">
							<a 
								className="btn" 
								href="/register"
								style={{ 
									float: "right", 
									cursor: "pointer", 
									color: "#fff",
									border: "1px solid #9CC0FA", 
									background: 'rgba(0,0,0,.5)',
									width: '100%'
								}}
							>I am new</a>
						</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Login;