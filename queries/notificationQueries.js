
export const getNotificationsQuery = `
  query getNotifications($order: JSON) {
    notifications(order: $order) {
      message
      url
    }
  }
`;
