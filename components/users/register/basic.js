import React, { Component } from 'react';

const getErrMessages = errObj => {
	let obj = {};

	errObj.errors.forEach(err => {
		obj[err.path] = err.message;
	});

	return obj;
};

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		errors: {}
	}

	handleChange = e => {
		this.setState({...this.state, [e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		const { name, email, password, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="form-control"
						onChange={this.handleChange}
						value={name}
					/>
					{errors.name}
				</div>

			<div className="form-group">
				<input
					type="text"
					name="email"
					placeholder="Email"
					className="form-control"
					onChange={this.handleChange}
					value={email}
				/>
				{errors.email}
			</div>

			<div className="form-group">
				<input
						type="password"
						name="password"
						placeholder="Password"
						className="form-control"
						onChange={this.handleChange}
						value={password}
				/>
				</div>
					<button onClick={this.handleSubmit} className="btn btn-outline-light">Register</button>
					<style jsx>{`
						button {
							float: right;
						}
					`}</style>
			</form>
		)
	}
}

export default Register;
