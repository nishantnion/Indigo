const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flight_id: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  status: { type: String, required: true },
  departure_gate: String,
  arrival_gate: String,
  scheduled_departure: Date,
  scheduled_arrival: Date,
  actual_departure: Date,
  actual_arrival: Date
});

module.exports = mongoose.model('Flight', flightSchema);