const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/orders',    orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '🟢 Server is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));