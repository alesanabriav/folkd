import React, { Component } from "react";

export class StepForm extends Component {
	state = {
		content: '',
		assign_id: ''
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const variables = this.state;

		this.props.onSubmit(variables);
	}

	handleCancel = (e) => {
		if(e) e.preventDefault();
		this.setState({content: '', assign_id: ''});
		this.props.onCancel();
	}

	render() {
		const { users } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-header">
					<div className="row">
						<div className="col-lg-8">
							<div className="form-group">
								<select
									name="assign_id"
									className="form-control"
									onChange={this.handleChange}
									value={this.state.assign_id}
								>
									<option value="">Assign to</option>
									{users.map(user =>
										<option key={user.id} value={user.id}>{user.email}</option>
									)}
								</select>
							</div>
						</div>

						<div className="col-lg-4">
							<button className="btn btn-primary" onClick={this.handleSubmit}>Send</button>
							<button className="btn btn-secondary" onClick={this.handleCancel}>Cancel</button>
						</div>
					</div>

				</div>

				<div className="form-content">
					<div className="form-group">
						<textarea
							name="content"
							className="form-control"
							rows="5"
							onChange={this.handleChange}
							value={this.state.content}
							placeholder="Task detail"
							></textarea>
					</div>
				</div>

				<style jsx>{`
					form {
						bottom: 0;
						width: 100%;
						margin-bottom: 20px;
					}

					.form-header {
						background: #4A59D8;
						padding: 20px;
					}

					button {
						float: right;
						width: 100%;
						margin-bottom: 10px;
						cursor: pointer;
					}
				`}</style>
		</form>
		)
	}
}

export default StepForm;
