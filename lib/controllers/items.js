const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const items = await Item.getAll(req.user.id);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// TO DO - implement items CRUD
