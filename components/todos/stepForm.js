import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getUsersQuery } from '../../queries/userQueries';
import { getTodoQuery } from '../../queries/todoQueries';
import { createStepMutation } from '../../queries/stepQueries';

export class StepForm extends Component {
	state = {
		content: '',
		todo_id: ''
	}
	
	handleChange = e => {
		this.setState({ [e.target.name] : e.target.value });
	}

	updateSteps = (proxy, { data }) => {
		let query = getTodoQuery;
		let variables = {
      id: this.props.project.todoId
    };

		const queryData = proxy.readQuery({ query, variables });

		let steps = [data.createStep].concat(queryData.todo.steps);

		proxy.writeQuery({ query, variables, data: {todo: {...queryData.todo, steps}} });

	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { content } = this.state;
		const { todo = {} } = this.props;

		this.props.createStep({
			variables: {
				todo_id: todo.id,
				content
			},
			update: this.updateSteps
		})
		.then(data => this.setState({content: ''}))
		.catch((message, err) => console.log('err', message, err)); 
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
						></textarea>
				</div>

				<div className="form-group">
					<button className="btn" onClick={this.handleSubmit}>Add</button>
				</div>
			
		</form>
		)
	}
}

export default compose(
  graphql(createStepMutation, {name: 'createStep'})
)(StepForm);
