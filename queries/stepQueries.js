import { gql } from 'react-apollo';

export const createStepMutation = gql`
	mutation createStep($content: String!, $todo_id: Int!) {
  	createStep(content: $content, todo_id: $todo_id) {
    	id
    	content
			created_at
    	author {
      	name
    	}
  	}
	}
`;
