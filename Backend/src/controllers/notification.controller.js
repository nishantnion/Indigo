const Notification = require('../models/notification.model');

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.createNotification = async (notificationData) => {
  try {
    const newNotification = await Notification.create(notificationData);
    return newNotification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};