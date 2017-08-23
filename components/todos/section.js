import React, { Component } from "react";
import fecha from 'fecha';
import TodoForm from './form';
import StepForm from './stepForm';

class Todos extends Component {

  renderLoading = () => {
    return (<section className="col-lg-6 todos"><h5>loading...</h5></section>);
  }

  render() {
    const { project, todo, loading } = this.props;
    if(loading) return this.renderLoading();

    return (
      <section className="col-lg-6 todos">
        <header>
          <h5>Task for {project.name}</h5>
        </header>

        <section>
          {
            !todo.hasOwnProperty('id') ?
            <TodoForm selectTodo={this.selectTodo} todo={todo} project={project} />
            : <div/>
          }
        </section>

        <div className="todos-items">
        {
          todo.hasOwnProperty('id') ?
          <div>
            <h2>{todo.title}</h2>
            <section className="todo__item">
              <header>
                Assigned: {todo.assigned.name}
              </header>
              <div className="todo__item__content">
                {todo.content}
              </div>
            </section>
          </div>
          : <div/>
        }

        {todo.steps && todo.steps.map((subtodo, ind) =>
          <section key={ind} className="todo__item">
            <header>
              Step: {ind + 1}
            </header>
             <div className="todo__item__content">
              {subtodo.content}
            </div>
          </section>
        )}
        </div>

        {todo.hasOwnProperty('id') ? <StepForm todo={todo} project={project} /> : <div/>}

        <style jsx>{`
          .todos {
            background: rgba(0,0,0,.6);
            padding-top: 20px;
            height: 100vh;
            color: #fff;
            overflow-y: auto;
          }

          .todos h5 {
            color: #fff;
          }
        `}</style>
      </section>
    );
  }
}

export default Todos;
