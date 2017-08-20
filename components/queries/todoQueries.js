import { gql } from 'react-apollo';

export const getTodoQuery = gql`
  query getTodo($id: Int!) {
		todo(where: {id: $id}) {
			id
			title
			content
			created_at
			author {
				id
				name
			}
			assigned {
				id
				name
			}
			steps(order: [["id", "desc"]]) {
				id
				content
        created_at
			}
		}
}
`;

export const createTodoMutation = gql`
	mutation createTodo($content: String!, $title: String, $project_id: Int!, $assign_id: Int) {
		createTodo(title: $title, content: $content, project_id: $project_id, assign_id: $assign_id) {
			id
			title
			content
			created_at
			author {
				id
				name
			}
			assigned {
				id
				name
			}
		}
	}
`;

export const createSubTodoMutation = gql`
	mutation createSubTodo($content: String!, $title: String, $project_id: Int!, $assign_id: Int, $todo_id: Int) {
		createTodo(title: $title, content: $content, project_id: $project_id, assign_id: $assign_id, todo_id: $todo_int) {
			id
			title
			content
			created_at
			author {
				id
				name
			}
			assigned {
				id
				name
			}
		}
	}
`;
