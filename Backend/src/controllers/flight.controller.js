const Flight = require('../models/flight.model');

exports.getAllFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    next(error);
  }
};

exports.updateFlight = async (flightData) => {
  try {
    const updatedFlight = await Flight.findOneAndUpdate(
      { flight_id: flightData.flight_id },
      flightData,
      { new: true, upsert: true }
    );
    return updatedFlight;
  } catch (error) {
    console.error('Error updating flight:', error);
    throw error;
  }
};