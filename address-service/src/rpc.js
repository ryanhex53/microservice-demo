const { Client, Server } = require('rpc-websockets');
const { USER_RPC_HOST, USER_RPC_PORT, RPC_PORT } = require('./config');
const { Address } = require('./models/address_model');

const server = new Server({
  port: RPC_PORT
});

server.register('findAddressById', findAddressById);

server.register('findOrCreateAddress', findOrCreateAddress);

async function findAddressById({ id }) {
  try {
    const address = await Address.findById(id);
    return address;
  } catch (error) {
    throw error;
  }
};

async function findOrCreateAddress({ street, city, state, zip }) {
  try {
    let address = await Address.findOne({ street, city, state, zip }).exec();
    if (address === null) {
      address = await new Address({ street, city, state, zip }).save();
    }
    return address;
  } catch (error) {
    throw error;
  }
}

module.exports = { findAddressById, findOrCreateAddress }