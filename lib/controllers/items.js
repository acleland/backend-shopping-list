const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

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
  })
  .put('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', authenticate, authorize, async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      res.json(item);
    } catch (err) {
      next(err);
    }
  });

// TO DO - implement items CRUD
