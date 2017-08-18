import React, { Component } from "react";
import Project from "./item";
import ProjectForm from "./form";

class Projects extends Component {
  state = {
    showForm: false
  }
  
  componentWillReceiveProps(props) {
    if(!props.project.selected.hasOwnProperty('id') && props.data.projects && props.data.projects.length > 0) {
      this.selectProject(props.data.projects[0]);
    }

    if(props.data.projects && props.data.projects.length == 0) {
      this.setState({showForm: true});
    }

  }

  selectProject = (project) => {
    //select first todo on select project if has todos
    this.props.dispatch({type: 'SELECT_PROJECT', payload: project});
    this.props.dispatch({type: 'SELECT_PROJECT_TODO', payload: null});
  }

  changeTodo = (todoId) => {
    this.props.dispatch({type: 'SELECT_PROJECT_TODO', payload: todoId});
  }

  toggleForm = (e) => {
    if(e) e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  } 

  handleProjectAdded = () => {
    this.toggleForm();
  }

  renderLoading = () => {
    return (<section className="col-lg-3 projects"><h5>loading...</h5></section>);
  }

  render() {
    const { data = {}, project } = this.props;
    const { projects = [] } = data;
    const { selected } = project;
    if(data.loading) return this.renderLoading();

    return (
      <section className="col-lg-3 projects">
        <header>
          <h5>Projects</h5>
           <div className="btns">
            <button onClick={this.toggleForm} className="btn btn-link"><i className="ion-plus"></i></button>
            <button className="btn btn-link"><i className="ion-search"></i></button>
          </div>
        </header>
        {this.state.showForm ? <ProjectForm client={this.props.client} onProjectAdded={this.handleProjectAdded} /> : <div/>}

          <ul>
            {projects.map(project => 
              <Project 
                key={project.id} 
                project={project} 
                selected={selected}
                selectProject={this.selectProject}
                changeTodo={this.changeTodo}
                />  
            )}
          </ul> 

      </section>
    );
  }
}

export default Projects;
