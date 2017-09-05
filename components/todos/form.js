import React, { Component } from "react";
import request from 'axios';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import DatePicker from '../date-picker';
import Upload from '../upload';

class TodoForm extends Component {
	state = {
		title: "",
		content: "",
		assign_id: 0,
		description: "",
		deadline_start: "",
		deadline_end: "",
		focused: false,
		date: null,
		files: []
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

	handleDeadline = (type, e) => {
		this.setState({ [`deadline_${type}`]: e });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, content, assign_id, deadline_start, deadline_end } = this.state;
		const { todo = {}, project = {} } = this.props;

		const variables = {
			project_id: project.id,
			title,
			content,
			assign_id,
			deadline_start,
			deadline_end
		};

		this.props.onSubmit(variables);
	}

	handleUploaded = (files) => {
		this.props.onUploaded(files);
		this.setState({ files });
	}

	render() {
		const { users, user } = this.props;
		const { files } = this.state;
		const uploadData = {'user_id': user.id};

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
				<div className="row">
					<div className="form-group datepicker-container col-lg-6">
						<DatePicker
							options={{minDate: "today"}}
							className="form-control"
							placeholderText="deadline start"
							onChange={this.handleDeadline.bind(null, 'start')}
						/>
					</div>

					<div className="form-group datepicker-container col-lg-6">
						<DatePicker
							options={{minDate: "today"}}
							className="form-control"
							placeholderText="deadline end"
							onChange={this.handleDeadline.bind(null, 'end')}
						/>
					</div>
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
				</div>

				<div className="form-group">
					<Upload
						data={uploadData}
						user={user}
						onUploaded={this.handleUploaded.bind(this)}
					/>
					<ul>
						{files.map(file => <li>{file.name}</li>)}
					</ul>
				</div>
				<div className="form-group">
					<button className="btn btn-outline-light" onClick={this.handleSubmit}>Create</button>
				</div>
				<style jsx>{`
					form {
						width: 100%;
						float: left;
						padding: 20px;
						background: rgba(0,0,0,.2)
					}

					.btn {
						float: right;
						cursor: pointer;
					}

					.on-drop {
						background: green;
					}
				`}</style>
		</form>
		)
	}
}

export default TodoForm;
