const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const item = await Item.getById(req.params.id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (err) {
      next(err);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch (err) {
      next(err);
    }
  });

// TO DO - implement items CRUD
