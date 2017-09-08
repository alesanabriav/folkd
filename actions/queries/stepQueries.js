
export const addStepMutation = `
	mutation createStep($content: String!, $todo_id: Int!, $assign_id: Int!, $position: Int) {
  	createStep(content: $content, todo_id: $todo_id, assign_id: $assign_id, position: $position) {
    	id
    	content
			created_at
			position
    	author {
				id
      	name
    	}
			assigned {
				id
				name
			}
			attachments {
				id
			}
  	}
	}
`;
