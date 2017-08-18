import { gql } from 'react-apollo';

export const getUsersQuery = gql`
	query getUsers{
		users {
			id
			name
			email
		}
	}
`;


