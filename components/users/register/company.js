import React, { Component } from 'react';

class RegisterCompany extends Component {
	state = {
		name: '',
		size: '',
		sector: ''
	}

	handleChange = e => {
		this.setState({...this.state, [e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		const { name, size, sector } = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						name="name"
						placeholder="Company name"
						className="form-control"
						onChange={this.handleChange}
						value={name}
					/>
				</div>

				<div className="form-group">
					<select
						name="size"
						className="form-control"
						onChange={this.handleChange}
						value={size}
					>
						<option value="">Select team size</option>
						<option value="1-10">1 - 10</option>
						<option value="10-50">10 - 50</option>
						<option value="50-100">50 - 100</option>
						<option value="100-250">100 - 250</option>
						<option value="250-500">250 - 500</option>
						<option value="500-1000">500 - 1000</option>
						<option value="1000-5000">1000 - 5000</option>
					</select>
				</div>

				<div className="form-group">
					<select
						name="sector"
						className="form-control"
						onChange={this.handleChange}
						value={sector}
					>
						<option value="">Select team sector</option>
						<option value="Design">Design</option>
						<option value="Technology">Technology</option>
					</select>
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

export default RegisterCompany;
