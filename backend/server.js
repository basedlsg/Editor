const express = require('express');
const commentaryRoutes = require('./routes/api/commentary');

const app = express();

// Body parser middleware
app.use(express.json());

// API routes
app.use('/api/commentary', commentaryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));