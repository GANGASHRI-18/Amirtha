// This is a mock notification service.
// In a real application, you would integrate with a service like FCM, OneSignal, etc.

const sendNotification = (user, message) => {
  // In a real app, you would look up the user's device token(s) and send a push notification.
  console.log(`--- PUSH NOTIFICATION ---`);
  console.log(`To: User ${user.id}`);
  console.log(`Message: ${message}`);
  console.log(`-----------------------`);
};

const notifyOnStatusChange = (report) => {
  const message = `The status of your report "${report.title}" has been updated to: ${report.status}.`;
  // We need the full user object to send a notification, but we only have the user ID.
  // In a real app, you might pass the full user object or fetch it here.
  // For now, we'll just log the user ID.
  const user = { id: report.user };
  sendNotification(user, message);
};

module.exports = {
  sendNotification,
  notifyOnStatusChange
};