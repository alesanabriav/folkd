
export const getClientProjectsQuery = `
  query getClientProjects($clientId: Int!, $name: JSON, $order: JSON) {
    projects(where: {client_id: $clientId, name: $name}, order: $order) {
      id
      name
      todosCount
      todos(order: [["id", "desc"]], where: {is_completed: false}) {
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

export const getAllProjectsQuery = `
  query getProjects($order: JSON) {
    projects(order: $order) {
      id
      client_id
      name
      todosCount
      todos(order: [["id", "desc"]], where: {is_completed: false}) {
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
