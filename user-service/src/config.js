const DB_HOST = process.env.DB_HOST || 'localhost:27017';
const RPC_PORT = process.env.RPC_PORT || 8080;
const ADDR_RPC_HOST = process.env.ADDR_RPC_HOST || 'localhost';
const ADDR_RPC_PORT = process.env.ADDR_RPC_PORT || 8080;

module.exports = { DB_HOST, RPC_PORT, ADDR_RPC_HOST, ADDR_RPC_PORT };