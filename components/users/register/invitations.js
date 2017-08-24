import React, { Component } from 'react';

class RegisterInvitations extends Component {
	state = {
		emails: []
	}

	handleChange = (num, e) => {
		let email = e.target.value;
		let emails = this.state.emails[num] = email;
		this.setState({ ...this.state, emails });
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{[1,2,3,4,5].map(num =>
					<div className="form-group">
						<input
							type="text"
							name="email"
							placeholder="Email"
							className="form-control"
							onChange={this.handleChange.bind('', num)}
							value={this.state.email}
						/>
				</div>
				)}

				<button onClick={this.handleSubmit} className="btn btn-outline-light">Send & finish</button>
				<button onClick={this.handleSubmit} className="btn btn-outline-secondary">Omit</button>
				<style jsx>{`
					button {
						float: right;
					}
				`}</style>
			</form>
		)
	}
}

export default RegisterInvitations;
