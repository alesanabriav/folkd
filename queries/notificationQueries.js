
export const getNotificationsQuery = `
  query getNotifications($order: JSON) {
    notifications(order: $order) {
      id
      message
      url
      user {
        id
        name
      }
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
      id
      message
      url
    }
  }
`;

export const updateNotificationQuery = `
  mutation updateNotification($id: Int!, $is_read: Boolean) {
    updateNotification(id: $id, is_read: $is_read) {
      id
    }
  }
`;
