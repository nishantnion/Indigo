let io;

const initialize = (server) => {
  io = require('socket.io')(server);
  
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });
};

const emitFlightUpdate = (flightData) => {
  if (io) {
    io.emit('flightUpdate', flightData);
  }
};

const emitNotification = (notification) => {
  if (io) {
    io.emit('appNotification', notification);
  }
};

module.exports = { initialize, emitFlightUpdate, emitNotification };