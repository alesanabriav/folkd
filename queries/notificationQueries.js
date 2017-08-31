
export const getNotificationsQuery = `
  query getNotifications($order: JSON) {
    notifications(order: $order) {
      user {
        id
        name
      }
      message
      url
    }
  }
`;

export const addNotificationsQuery = `
  mutation createNotification($message: STRING, $user_id: INT) {
    createNotifications($message, $user_id) {
      user {
        id
        name
      }
      message
      url
    }
  }
`;
