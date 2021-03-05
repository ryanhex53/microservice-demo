const { Router } = require('express');
const { User } = require('./models/user_model');
const { address_service } = require('./rpc');

const router = Router();
/**
 * get all users
 */
router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
/**
 * get user by id
 */
router.get('/:id([0-9a-f]{24})', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null)
      return next();
    const response = user.toObject();
    const address = await address_service.call('findAddressById', { id: user.address_id });
    if (address != null) {
      delete response.address_id;
      Object.assign(response, address);
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
});
/**
 * create user
 * accept body
 * @example
 * {"user":{"first_name":"M","last_name":"S"},"address":{"street":"S","city":"c","state":"S"}}
 */
router.post('/', async (req, res, next) => {
  try {
    const address = await address_service.call('findOrCreateAddress', { ...req.body.address });
    const user = new User({
      ...req.body.user,
      address_id: address._id
    });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});
/**
 * update user
 * accept body
 * @param {ObjectId} id user id
 * @example
 * {"user":{"first_name":"M","last_name":"S"}}
 * or
 * {"address":{"street":"S","city":"c","state":"S"}}
 * or part of them
 */
router.put('/:id([0-9a-f]{24})', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null)
      return next(); // 404
    if (req.body.user) {
      Object.assign(user, req.body.user);
    }
    if (req.body.address) {
      const old_addr = await address_service.call('findAddressById', { id: user.address_id });
      delete old_addr._id;
      const new_addr = Object.assign(old_addr, req.body.address);
      const address = await address_service.call('findOrCreateAddress', { ...new_addr });
      user.address_id = address._id;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});
/**
 * remove user by id
 */
router.delete('/:_id([0-9a-f]{24})', async (req, res, next) => {
  try {
    const response = await User.deleteOne({ ...req.params });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;