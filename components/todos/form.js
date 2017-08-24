import React, { Component } from "react";
// import { getUsersQuery } from '../../queries/userQueries';
// import { createTodoMutation, getTodoQuery } from '../../queries/todoQueries';

class TodoForm extends Component {
	state = {
		title: "",
		content: "",
		assign_id: 0
	}

	handleChange = e => {
		this.setState({ [e.target.name] : e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, content, assign_id } = this.state;
		const { todo = {}, project = {} } = this.props;

		const variables = {
			project_id: project.id,
			title,
			content,
			assign_id
		};

		this.props.onSubmit(variables);
	}

	render() {
		const { users } = this.props;

		return (
			<form onSubmit={this.handleSubmit} className="todos-form">
				<div className="form-group">
					<input
						placeholder="Title"
						type="text"
						name="title"
						className="form-control"
						onChange={this.handleChange}
						value={this.state.title}
					/>
				</div>
				<div className="form-group">
					<select
						name="assign_id"
						className="form-control"
						onChange={this.handleChange}
						value={this.state.assign_id}
						>
						<option value="">Assign to</option>
						{users.map(user =>
							<option key={user.id} value={user.id}>{user.name}</option>
						)}
					</select>
				</div>
				<div className="form-group">
					<textarea
						name="content"
						className="form-control"
						placeholder="Todo description"
						rows="5"
						onChange={this.handleChange}
						value={this.state.content}
						></textarea>
				</div>
				<div className="form-group">
					<button className="btn btn-outline-light" onClick={this.handleSubmit}>Create</button>
				</div>
				<style>{`
					.btn {
						float: right;
						cursor: pointer;
					}
				`}</style>
		</form>
		)
	}
}

export default TodoForm;
