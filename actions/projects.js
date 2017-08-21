import { createApolloFetch } from 'apollo-fetch';
import {
  getClientsQuery,
  createClientMutation,
  updateClientMutation,
} from '../queries/clientQueries';
const uri = 'http://api.githunt.com/graphql';
const apolloFetch = createApolloFetch({ uri });
const TYPE = 'PROJECTS';

export function getProjects() {

}

export function addClient() {

}

export function updateClient() {

}
