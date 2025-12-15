const express = require('express');
const cors = require('cors');
require('dotenv').config(); // This must be at the top

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const generationRoutes = require('./routes/generation');
app.use('/api/v1/generate-design', generationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('FENGSHUI AI Backend is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
