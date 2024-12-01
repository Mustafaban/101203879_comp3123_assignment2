require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/config');
const userRoutes = require('./routes/user');
const empRoutes = require('./routes/emp');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/emp', empRoutes);
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});