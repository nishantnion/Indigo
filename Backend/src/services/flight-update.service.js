const rabbitmqService = require("./rabbitmq.service");

const publishFlightUpdate = async (flightData) => {
  try {
    await rabbitmqService.publishMessage("flight-updates", flightData);
    console.log("Flight update published to RabbitMQ");
  } catch (error) {
    console.error("Error publishing flight update:", error);
  }
};

module.exports = { publishFlightUpdate };
