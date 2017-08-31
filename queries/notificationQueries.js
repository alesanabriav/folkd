
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

export const addNotificationQuery = `
  mutation createNotification($message: String!, $user_id: Int!, $url: String) {
    createNotification(message: $message, user_id: $user_id, url: $url) {
      user {
        id
        name
      }
      message
      url
    }
  }
`;
