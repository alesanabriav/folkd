
export const getClientProjectsQuery = `
  query getClientProjects($clientId: Int!, $name: JSON) {
    projects(where: {client_id: $clientId, name: $name}) {
      id
      name,
      todosCount,
      todos {
        id,
        title
      }
    }
}
`;

export const createProjectMutation = `
  mutation createProject($name: String!, $clientId:Int!) {
    createProject(name: $name, client_id: $clientId) {
      id
      name
      todosCount
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
