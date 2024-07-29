const nodemailer = require('nodemailer');
const socketService = require('./socket.service');
const notificationController = require('../controllers/notification.controller');

const sendNotification = async (notification) => {
  try {
    switch (notification.method) {
      case 'SMS':
        // Implement SMS sending logic
        console.log(`Sending SMS to ${notification.recipient}: ${notification.message}`);
        break;
      case 'Email':
        await sendEmail(notification);
        break;
      case 'App':
        socketService.emitNotification(notification);
        break;
    }
    await notificationController.createNotification(notification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

const sendEmail = async (notification) => {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Add your email service configuration here
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: notification.recipient,
    subject: 'Flight Status Update',
    text: notification.message
  });
};

module.exports = { sendNotification };