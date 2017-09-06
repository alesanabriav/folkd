import React, { Component } from "react";

export class Project extends Component {

  selectProject = (e) => {
    e.preventDefault();
    this.props.onSelectProject(this.props.project);
  }

  changeTodo = (todo, e) => {
    e.preventDefault();
    this.props.onChangeTodo(todo);
  }

  toggleCompleted = (e) => {
    e.preventDefault();
    this.props.onToggleCompleted();
  }

  render() {
    const {
      project,
      selected,
      todoSelected,
      currentUser,
      filters,
      todosAssignedCount,
      todosCount
    } = this.props;

    return (
      <li className={`projects__item ${project.id == selected.id ? 'projects__item--active' : ''}`}>
        <a href="#" onClick={this.selectProject}>
          <span className="projects__item__name">{project.name}</span>
          {/* <span className={project.id == selected.id ? "projects__item__icon ion-chevron-down" : "projects__item__icon ion-chevron-right"}></span> */}
          <span className="projects__item__todos-count"></span>
      </a>

        {project.todos.length > 0 ?
          <ul className={"projects__todos--open" }>
            {project.todos.map(todo => {
              if(todo.is_completed == filters.isCompleted) {
                return (
                  <li key={todo.id} className={todo.id == todoSelected.id ? 'projects__todo--active' : '' }>
                    <a href="#" onClick={this.changeTodo.bind(null, todo)}>
                      {todo.assigned.id == currentUser.id
                        ? <i className="ion-android-radio-button-on"></i>
                        : <i className="ion-android-radio-button-off"></i>}  {todo.title}</a>
                  </li>
                )
              }
            })}
          </ul>
        : ''}

        <style jsx>{`
          .projects__item {
            list-style: none;
          }

          .projects__item__todos-count {
            float: right;
            margin-right: 10px;
            color: rgba(255,255,255, .6);
          }

          .projects__item__icon {
            float: right;
          }

          .projects__item > a {
            color: #fff;
            width: 100%;
            height: 40px;
            display: block;
            background: rgba(0,0,0,.2);
            padding: 10px 20px;
            margin-bottom: 2px;
            transition: all .3s ease-in-out;
          }

          .projects__item a:hover {
            background: rgba(0,0,0,.4);
          }

          .projects__item--active > a {
            background: rgba(0,0,0,.4);
          }

          .projects__item ul li a {
            margin-bottom: 2px;
            background: rgba(0,0,0, .1);
            height: 40px;
            padding: 10px 40px;
            display: block;
            transition: all .3s ease-in-out;
          }

          .projects__item ul li a i {
            margin-right: 10px;
          }

          .projects__todos {
            display: none;
          }

          .projects__todos--open {
            display: block;
          }


          .projects__todo--active {
            background: rgba(0,0,0, .2);
          }

          .projects__todos li a, .projects__todos--open li a {
            color: #f7f7f7;
            font-weight: 200;
            font-size: 14px;

          }

        `}</style>
      </li>
    )
  }
}

export default Project;
