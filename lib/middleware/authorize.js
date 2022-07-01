const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);

    if (item.user_id !== req.params.id || !item) {
      throw new Error('You do not have access to view this page');
    }
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
