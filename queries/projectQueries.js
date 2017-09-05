
export const getClientProjectsQuery = `
  query getClientProjects($clientId: Int!, $name: JSON) {
    projects(where: {client_id: $clientId, name: $name}, order: [["id", "desc"]]) {
      id
      name
      todosCount
      todosAssignedCount
      todos(order: [["id", "desc"]]) {
        project_id
        id
        title
        is_completed
        assigned {
  				id
  			}
      }

    }
}
`;

export const addProjectMutation = `
  mutation createProject($name: String!, $clientId: Int!) {
    createProject(name: $name, client_id: $clientId) {
      id
      name
      todosCount
      todosAssignedCount
      todos {
        id
        title
      }
    }
  }
`;

export const updateProjectMutation = `
  mutation updateProject($projectId: Int!, $name:String!, $clientId:Int!) {
    createProject(name: $name, client_id: $clientId) {
      id
      name
    }
  }
`;
