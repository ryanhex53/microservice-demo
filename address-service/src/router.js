const {Router} = require('express');
const rpc_controller = require('./rpc');
const { Address } = require('./models/address_model');

const router = Router();

/**
 * get all adresses
 */
router.get('/', async (req, res) => {
  const address = await Address.find({});
  res.json(address);
});
/**
 * get address by id
 */
router.get('/:id([0-9a-f]{24})', async (req, res, next) => {
  try {
    const address = await rpc_controller.findAddressById({ ...req.params });
    res.json(address);
  } catch (error) {
    next(error);
  }
});
/**
 * find or create new address
 */
router.post('/', async (req, res, next) => {
  try {
    const address = await rpc_controller.findOrCreateAddress({ ...req.body })
    res.json(address);
  } catch (error) {
    return next(error);
  }
});
/**
 * update address by id
 */
router.put('/:id([0-9a-f]{24})', async (req, res, next) => {
  try {
    const address = await rpc_controller.findAddressById({ ...req.params });
    Object.assign(address, req.body);
    await address.save();
    res.json(address);
  } catch (error) {
    next(error);
  }
});
/**
 * remove address by id
 */
router.delete('/:_id([0-9a-f]{24})', async (req, res, next) => {
  try {
    const response = await Address.deleteOne({ ...req.params });
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;