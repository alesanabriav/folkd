import React from 'react';
import request from 'axios';

const getErrMessages = errObj => {
	let obj = {};
	
	errObj.errors.forEach(err => {
		obj[err.path] = err.message;
	});

	return obj;
};

class Register extends React.Component {
	state = {
		email: '',
		password: '',
		errors: {}
	}

	handleChange = e => {
		this.setState({...this.state, [e.target.name]: e.target.value});
	}

	store = e => {
		e.preventDefault();
		request.post('/register', this.state)
		.then(({data}) => {
			this.props.redirect(`/register/${data.id}/company`);
		})
		.catch(({response}) => this.setState({ errors: getErrMessages(response.data) }) );
	}

	render() {
		return (
			<form onSubmit={this.store} className="col-md-3">
			<div className="form-group">
				<input 
					type="text" 
					name="email"
					placeholder="Email" 
					className="form-control"
					onChange={this.handleChange} 
					value={this.state.email}	
				/>
				{this.state.errors.email}
			</div>
				
			<div className="form-group">
				<input 
						type="password" 
						name="password"
						placeholder="Password" 
						className="form-control"
						onChange={this.handleChange} 
						value={this.state.password}	
				/>
				</div>
					<button onClick={this.store} className="btn btn-secondary">Register</button>
			</form>
		)
	}
}

export default Register;