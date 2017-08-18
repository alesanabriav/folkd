import React, { Component } from "react";

class Project extends Component {
  selectProject = (e) => {
    e.preventDefault();
    this.props.selectProject(this.props.project);
  }

  changeTodo = (todoId, e) => {
    e.preventDefault();
    this.props.changeTodo(todoId);
  }

  render() {
    const { project = {}, selected = {} } = this.props;
    
    return (
      <li className={`projects__item ${project.id == selected.id ? 'projects__item--active' : ''}`}>
        <a href="#" onClick={this.selectProject}>
          <span className="projects__item__name">{project.name}</span>
          <span className="projects__item__todos-count">{project.todosCount}</span>
        </a>
        {project.todos.length > 0 ? 
          <ul>
            {project.todos.map(todo => 
              <li key={todo.id}><a href="#" onClick={this.changeTodo.bind(null, todo.id)}>{todo.title}</a></li>
            )}
          </ul>
        : ''}
      </li>
    )
  }
}

export default Project;
