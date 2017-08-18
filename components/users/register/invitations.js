import React from 'react';
import request from 'axios';

class RegisterCompany extends React.Component {
	state = {
		emails: []
	}

	handleChange = (num, e) => {
		let email = e.target.value;
		let emails = this.state.emails[num] = email; 
		this.setState({...this.state, emails});
	}

	store = e => {
		e.preventDefault();
		request.post(`/register/${this.props.userId}/company`, this.state)
			.then(({ data }) => {
				console.log(data);
			});
	}

	render() {
		return (
			<form onSubmit={this.store} className="col-md-3">
				{[1,2,3,4,5].map(num => 
					<div className="form-group">
						<input 
							type="text" 
							name="email"
							placeholder="Company"
							className="form-control"
							onChange={this.handleChange.bind('', num)} 
							value={this.state.email}	
						/>
				</div>
				)}
			
		
				<button onClick={this.store} className="btn btn-secondary">Next</button>
			</form>
		)
	}
}

export default RegisterCompany;