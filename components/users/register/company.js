import React from 'react';
import request from 'axios';

class RegisterCompany extends React.Component {
	state = {
		name: ''
	}

	handleChange = e => {
		this.setState({...this.state, [e.target.name]: e.target.value});
	}

	store = e => {
		e.preventDefault();
		request.post(`/register/${this.props.userId}/company`, this.state)
			.then(({ data }) => {
				localStorage.setItem('token', data.token);
				this.props.redirect('/home');
			});
	}

	render() {
		return (
			<form onSubmit={this.store} className="col-md-3">
				<div className="form-group">
					<input 
						type="text" 
						name="name"
						placeholder="Company"
						className="form-control"
						onChange={this.handleChange} 
						value={this.state.email}	
					/>
				</div>
		
				<button onClick={this.store} className="btn btn-secondary">Next</button>
			</form>
		)
	}
}

export default RegisterCompany;