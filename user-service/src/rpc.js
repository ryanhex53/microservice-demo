const { Client, Server } = require('rpc-websockets');
const { ADDR_RPC_HOST, ADDR_RPC_PORT, RPC_PORT } = require('./config');

const server = new Server({
  port: RPC_PORT
});

const address_service = new Client(`ws://${ADDR_RPC_HOST}:${ADDR_RPC_PORT}`, {
  max_reconnects: 0
});

address_service.on('open', () => {
  console.log('address server open');
});

module.exports = { address_service }
