import React, { Component } from 'react';


export class ClientForm extends Component {

  state = {
    name: '',
    abbreviation: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  cleanState = () => {
    this.setState({name: '', abbreviation: ''});
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state).then(() => {
      this.cleanState();
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="abbreviation"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.abbreviation}
              placeholder="Shortname"
            />
          </div>
        <button style={{display: 'none'}}></button>
      </form>
    );
  }
}

export default ClientForm;
