
export const getTodoQuery = `
  query getTodo($id: Int!) {
		todo(where: {id: $id}) {
			id
			title
			content
      deadline_start
      deadline_end
      is_completed
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
        position
        created_at
        author {
          id
          name
        }
			}
		}
}
`;

export const addTodoMutation = `
  mutation createTodo(
    $content: String!,
    $title: String,
    $project_id: Int!,
    $assign_id: Int,
    $deadline_start: String,
    $deadline_end: String
  ) {
  createTodo(
    title: $title,
    content: $content,
    project_id: $project_id,
    assign_id: $assign_id,
    deadline_start: $deadline_start,
    deadline_end: $deadline_end
  ) {
    id
    project_id
    title
    content
    deadline_start
    deadline_end
    is_completed
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

export const updateTodoMutation = `
  mutation updateTodo(
    $content: String!,
    $title: String,
    $project_id: Int!,
    $assign_id: Int,
    $deadline_start: String,
    $deadline_end: String,
    $is_completed: Boolean
  ) {
  updateTodo(
    title: $title,
    content: $content,
    project_id: $project_id,
    assign_id: $assign_id,
    deadline_start: $deadline_start,
    deadline_end: $deadline_end,
    is_completed: $is_completed
  ) {
    id
    project_id
    title
    content
    is_completed
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

export const createSubTodoMutation = `
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
