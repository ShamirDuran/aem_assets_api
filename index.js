const { port, prefix } = require('./src/configs/env.config');
const { logger } = require('./src/utils/logs.util');
const errorHandlerMiddleware = require('./src/middlewares/error.middleware');

// Express
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get(`/${prefix}`, (req, res) => res.json({ message: 'ok' }));
app.use(`/${prefix}/test`, require('./src/routes/test.route'));

// Error handler
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  logger('info', `Server running on port ${port}`);
});
