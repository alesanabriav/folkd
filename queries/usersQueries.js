
export const getUsersQuery = `
	query getUsers{
		users {
			id
			name
			email
			role
		}
	}
`;

export const getUserQuery = `
	query getUser {
		user {
			id
			name
			email
			role,
		}
	}
`
