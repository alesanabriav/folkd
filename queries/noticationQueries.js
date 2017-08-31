
export const getNotifications = `
  query getNotifications($order: JSON) {
    notifications(order: $order) {
      message
      url
    }
  }
`;
