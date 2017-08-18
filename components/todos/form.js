import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getUsersQuery } from '../../queries/userQueries';
import { createTodoMutation, getTodoQuery } from '../../queries/todoQueries';
import Dropzone from 'react-dropzone';

export class TodoForm extends Component {
	state = {
		title: "",
		content: "",
		assign_id: 0
	}
	
	handleChange = e => {
		this.setState({ [e.target.name] : e.target.value });
	}

	updateTodos = (proxy, { data }) => {
		//it should update project todos list
		// it should update todos views with this new todo
		;
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { title, content, assign_id } = this.state;
		const { todo = {}, project = {} } = this.props;
		const { selected } = project;

		this.props.createTodo({
			variables: {
				project_id: selected.id,
				title, 
				content, 
				assign_id
			}
		}).then(({ data }) => {
			this.props.selectTodo(data.createTodo);
		});
	}

	render() {
		const { getUsers = {} } = this.props;
		const { users = [], loading } = getUsers;

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
						rows="5" 
						onChange={this.handleChange}
						value={this.state.content}
						></textarea>
				</div>
				<div className="form-group">
					<button className="btn btn-secondary" onClick={this.handleSubmit}>Create & Assign</button>
				</div>
			
		</form>
		)
	}
}

export default compose(
  graphql(getUsersQuery, {name: 'getUsers'}),
  graphql(createTodoMutation, {name: 'createTodo'}),
)(TodoForm);
