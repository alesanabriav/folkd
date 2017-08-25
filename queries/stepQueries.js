
export const addStepMutation = `
	mutation createStep($content: String!, $todo_id: Int!, $position: Int) {
  	createStep(content: $content, todo_id: $todo_id, position: $position) {
    	id
    	content
			created_at
			position
    	author {
				id
      	name
    	}
  	}
	}
`;
