import React, { Component } from "react";
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';

class TodoForm extends Component {
	state = {
		title: "",
		content: "",
		assign_id: 0,
		description: ""
	}

	handleChange = e => {
		this.setState({ [e.target.name] : e.target.value });
	}

	handleDescription = (e) => {
		const description = e.target.value;
		const md = new MarkdownIt();
		md.use(taskLists);
		var result = md.render(description);
		this.setState({ content: description, description: result });
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
							<option key={user.id} value={user.id}>{user.email}</option>
						)}
					</select>
				</div>
				<div className="form-group">
					<textarea
						name="content"
						className="form-control"
						placeholder="Todo description"
						rows="5"
						onChange={this.handleDescription}
						value={this.state.content}
						></textarea>
						<div className="todo-result">
							<div
								className="result__container"
								dangerouslySetInnerHTML={{__html: this.state.description}}
							/>
						</div>
				</div>
				<div className="form-group">
					<button className="btn btn-outline-light" onClick={this.handleSubmit}>Create</button>
				</div>
				<style jsx>{`
					form {
						width: 100%;
						float: left;
						padding: 20px;
						background: rgba(255,255,255,.1)
					}



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
