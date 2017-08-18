import { graphql } from "react-apollo";
import { connect } from 'react-redux';
import Todos from './section';
import { getTodoQuery } from '../../queries/todoQueries';

const todosWithData = graphql(getTodoQuery, {
   options: props => ({
    variables: {
      id: props.project.todoId
    }
  }),
  skip: props => { 
    return !props.project.todoId ? true : false;
  }
})(Todos);

const mapStateToProps = state => ({
  client: state.client,
	project: state.project,
	todo: state.todo
});

export default connect(mapStateToProps)(todosWithData);