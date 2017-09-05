
export const updateAttachmentMutation = `
mutation updateAttachment($id: Int, $todo_id: Int, $step_id: Int, $name: String) {
  updateAttachment(id: $id, todo_id: $todo_id, step_id: $step_id, name: $name) {
    id
    todo_id
    step_id
    name
    url
  }
}
`;
