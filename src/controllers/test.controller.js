const testService = require('../services/test.service');

const get = async (req, res, next) => {
  try {
    res.json(await testService.getMultiple(req.query.page));
    // res.json(await testService.getMultiple(req.body.page));
    // res.json(await testService.getMultiple(req.params.page));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    res.status(201).json(await testService.create(req.body));
  } catch (error) {
    next(error);
  }
};

// Call this route to see an example of an uncaught exception
const update = async (req, res, next) => {
  try {
    res.json(await testService.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
};

// Call this route to see an example of a caught exception
const remove = async (req, res, next) => {
  try {
    if (true) {
      const error = new Error('This is a test error'); // Define the error message here
      error.statusCode = 404; // Specify the error status code here or it will be 500 by default
      throw error;
    }

    res.json(await testService.remove(req.params.id));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
};
