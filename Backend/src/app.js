const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const connectDatabase = require('./config/database');
const flightRoutes = require('./routes/flight.routes');
const notificationRoutes = require('./routes/notification.routes');
const socketService = require('./services/socket.service');
const rabbitmqService = require('./services/rabbitmq.service');
const errorHandler = require('./utils/errorHandler');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDatabase();

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling
app.use(errorHandler);

// Initialize Socket.IO
socketService.initialize(server);

// Initialize RabbitMQ
rabbitmqService.initialize();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));