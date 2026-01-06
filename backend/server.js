const express = require('express'); 

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const http = require("http")
const Routes = require("./src/routes/index.js")
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



const {initSocket} = require("./src/socket/index.js")

app.use('/api',Routes);

app.get('/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    nodeVersion: process.version
  };
  
  res.status(200).json(healthData);
});

// Root endpoint 
app.get('/', (req, res) => { 
  res.json({ 
    message: 'Server is running', 
    endpoints: { 
      health: '/health', 
      root: '/' 
    } 
  }); 
});


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: ['/', '/health']
  });
});


const server = http.createServer(app);

initSocket(server);
// Start server

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);

});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});