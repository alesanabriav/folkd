import React, { Component } from "react";
import request from 'axios';
import MarkdownIt from 'markdown-it';
import taskLists from 'markdown-it-task-lists';
import DatePicker from 'react-datepicker';
import Dropzone from 'react-dropzone';

class TodoForm extends Component {
	state = {
		title: "",
		content: "",
		assign_id: 0,
		description: "",
		deadline_start_obj: null,
		deadline_end_obj: null,
		deadline_start: "",
		deadline_end: "",
		focused: false,
		date: null
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
		this.setState({ [`deadline_${type}_obj`]: e });
	}

	getDriveUrl = (e) => {
		e.preventDefault();
		const token = localStorage.getItem('folk-token');
		const { user } = this.props;
		const state = encodeURIComponent(JSON.stringify({id: user.id}));
		const config = {
			headers: {'Authorization': `Bearer ${token}`}
		};

		request
		.post('/gaoauth-url', {state}, config)
		.then(res => window.location = res.data.url);
	}

	handleDrop = (acceptedFiles, rejectedFiles) => {
		const {user} = this.props;
		const token = localStorage.getItem('folk-token');
		const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
		};

		const requests = acceptedFiles.map(file => {
			const data = new FormData();
			data.append('user_id', user.id);
			data.append('file', file);
			return request.post('/upload', data, config);
		});

		request.all(requests)
			.then(request.spread(function (acct, perms) {
				console.log(acct, perms);
  		}))
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

	render() {
		const { users, user } = this.props;

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
						className="form-control"
						placeholderText="deadline start"
						selected={this.state.deadline_start_obj}
        		onChange={this.handleDeadline.bind(null, 'start')}
						onSelect={date => this.setState({deadline_start: date.format('YYYY-MM-DD')})}
					/>
				</div>
				<div className="form-group datepicker-container col-lg-6">
					<DatePicker
						className="form-control"
						placeholderText="deadline end"
						selected={this.state.deadline_end_obj}
        		onChange={this.handleDeadline.bind(null, 'end')}
						onSelect={date => this.setState({deadline_end: date.format('YYYY-MM-DD')})}
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
					{user.has_drive ?
					<Dropzone onDrop={this.handleDrop}>
						<p>Drop files or select</p>
					</Dropzone>
					: <a href="#" onClick={this.getDriveUrl}>add google drive</a>}
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
				`}</style>
		</form>
		)
	}
}

export default TodoForm;
