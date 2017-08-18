import { gql } from "react-apollo";

export const getClientProjectsQuery = gql`
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

export const createProjectMutation = gql`
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

export const updateProjectMutation = gql`
  mutation updateProject($projectId: Int!, $name:String!, $clientId:Int!) {
    createProject(name: $name, client_id: $clientId) {
      id
      name
    }
  }
`;