import React, { Component } from "react";
import fecha from 'fecha';
import TodoForm from './form';
import StepForm from './stepForm';

class Todos extends Component {

  selectTodo = (todo) => {
    this.props.dispatch({type: 'SELECT_PROJECT_TODO', payload: todo.id})
  }

  renderLoading = () => {
    return (<section className="col-lg-6 todos"><h5>loading...</h5></section>);
  }

  render() {
    const { project = {selected: {}}, data = {} } = this.props;
    let { todo = {steps: []} } = data;

    if(data.loading) return this.renderLoading();
    
    return (
      <section className="col-lg-6 todos">
        <header>
          <h5>Task for {project.selected.name}</h5>
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

        {todo.steps.map((subtodo, ind) => 
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
        
      </section> 
    );
  }
}


export default Todos;
