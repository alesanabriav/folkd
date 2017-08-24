import React, { Component } from 'react';

class RegisterTeam extends Component {
	state = {
		team_name: ''
	}

	handleChange = e => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						name="team_name"
						placeholder="Team Name"
						className="form-control"
						onChange={this.handleChange}
						value={this.state.email}
					/>
				</div>

				<button onClick={this.handleSubmit} className="btn btn-outline-light">Next</button>
				<style jsx>{`
					button {
						float: right;
					}
				`}</style>
			</form>
		)
	}
}

export default RegisterTeam;
