const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const referralRoutes = require('./routes/referralRoutes');

const errorHandler = require('./middleware/errorHandler');
const prisma = require('../prisma');
prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed', err));


// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', referralRoutes);

app.use(errorHandler);

module.exports = app;
