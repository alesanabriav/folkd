import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { getClientsQuery } from '../../queries/clientQueries';

export class SearchClients extends Component {
	state = {
		name: ''
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		//send name to search
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="input-group">
				<input 
						type="text" 
						name="name" 
						className="form-control"
						placeholder="Search clients"
						onChange={this.handleChange}
						value={this.state.name}
					/>
				</div>
			</form>
		)
	}
}

export default SearchClients;