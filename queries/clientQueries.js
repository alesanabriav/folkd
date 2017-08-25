
export const getClientsQuery = `
  query getClients($clientName: JSON, $order: JSON) {
    clients(where: {name: $clientName}, order: $order) {
      id
      name
      abbreviation
    }
}
`;

export const addClientMutation = `
  mutation createClient($name: String!, $abbreviation: String) {
    createClient(name: $name, abbreviation: $abbreviation) {
      id
      name
      abbreviation
    }
  }
`;

export const updateClientMutation = `
  mutation updateClient($name: String!, $abbreviation: String, $id: Int!) {
    updateClient(id: $id, name: $name) {
      id
      name
      abbreviation
    }
  }
`;
