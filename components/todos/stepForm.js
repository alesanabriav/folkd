import React, { Component } from "react";

export class StepForm extends Component {
	state = {
		content: ''
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { content } = this.state;
		const variables = { content };
		this.props.onSubmit(variables);
	}
	render() {
		const { getUsers = {} } = this.props;
		const { users = [], loading } = getUsers;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<textarea
						name="content"
						className="form-control"
						rows="5"
						onChange={this.handleChange}
						value={this.state.content}
						placeholder="Description"
						></textarea>
				</div>

				<div className="form-group">
					<button className="btn btn-light" onClick={this.handleSubmit}>Add step</button>
				</div>

				<style jsx>{`
					button {
						float: right;
						width: 200px;
						cursor: pointer;
					}
				`}</style>
		</form>
		)
	}
}

export default StepForm;
