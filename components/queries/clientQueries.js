import { gql } from "react-apollo";

export const getClientsQuery = gql`
  query getClients($clientName: JSON, $order: JSON) {
    clients(where: {name: $clientName}, order: $order) {
      id
      name
    }
}
`;

export const createClientMutation = gql`
  mutation createClient($name: String!, $abbreviation: String) {
    createClient(name: $name, abbreviation: $abbreviation) {
      id
      name
      abbreviation
    }
  }
`;

export const updateClientMutation = gql`
  mutation updateClient($name: String!, $abbreviation: String, $id: Int!) {
    updateClient(id: $id, name: $name) {
      id
      name
      abbreviation
    }
  }
`;