const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { initWebSocket } = require('./utils/websocket');
const tradeRoutes = require('./routes/trades');
const spaceShipRoutes = require('./routes/spaceShips');
const planetRoutes = require('./routes/planets');
const inventoryRoutes = require('./routes/inventories');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', tradeRoutes);
app.use('/api', spaceShipRoutes);
app.use('/api', planetRoutes);
app.use('/api', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Intergalactic Trade Network!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/intergalactic-trade-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
initWebSocket(server);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
