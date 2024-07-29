const amqp = require('amqplib');
const flightController = require('../controllers/flight.controller');
const socketService = require('./socket.service');

let channel;

const initialize = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    
    const queue = 'flight-updates';
    await channel.assertQueue(queue, { durable: false });
    
    console.log('Waiting for messages in %s', queue);
    
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const flightUpdate = JSON.parse(msg.content.toString());
        const updatedFlight = await flightController.updateFlight(flightUpdate);
        socketService.emitFlightUpdate(updatedFlight);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

const publishMessage = async (queue, message) => {
  if (channel) {
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  } else {
    console.error('RabbitMQ channel not initialized');
  }
};

module.exports = { initialize, publishMessage };